import { supabase } from "@/integrations/supabase/client";

interface DuplicateGroup {
  name: string;
  collectors: Array<{
    id: string;
    name: string;
    number: string;
    prefix: string;
    members_count: number;
  }>;
}

export async function findDuplicateCollectors(): Promise<DuplicateGroup[]> {
  const { data, error } = await supabase
    .from('collectors')
    .select(`
      id,
      name,
      number,
      prefix,
      members:members(count)
    `)
    .order('name');

  if (error) throw error;

  const groupedCollectors = data.reduce((acc: { [key: string]: any[] }, curr) => {
    const name = curr.name.toLowerCase().trim();
    if (!acc[name]) acc[name] = [];
    acc[name].push({
      ...curr,
      members_count: curr.members?.length || 0
    });
    return acc;
  }, {});

  return Object.entries(groupedCollectors)
    .filter(([_, collectors]) => collectors.length > 1)
    .map(([name, collectors]) => ({
      name,
      collectors: collectors as Array<{
        id: string;
        name: string;
        number: string;
        prefix: string;
        members_count: number;
      }>
    }));
}

export async function mergeCollectors(duplicates: DuplicateGroup[]): Promise<void> {
  for (const group of duplicates) {
    // Sort collectors by member count (descending) and creation date
    const sortedCollectors = [...group.collectors].sort((a, b) => 
      b.members_count - a.members_count
    );

    const primaryCollector = sortedCollectors[0];
    const duplicateIds = sortedCollectors.slice(1).map(c => c.id);

    // Update members to use the primary collector
    const { error: updateError } = await supabase
      .from('members')
      .update({ collector_id: primaryCollector.id })
      .in('collector_id', duplicateIds);

    if (updateError) {
      console.error('Error updating members:', updateError);
      continue;
    }

    // Delete duplicate collectors
    const { error: deleteError } = await supabase
      .from('collectors')
      .delete()
      .in('id', duplicateIds);

    if (deleteError) {
      console.error('Error deleting duplicates:', deleteError);
    }
  }
}