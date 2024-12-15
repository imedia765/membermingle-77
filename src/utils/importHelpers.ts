import { supabase } from "@/integrations/supabase/client";
import { transformMemberForSupabase, transformCollectorForSupabase } from "@/utils/dataCleanup";

interface CsvData {
  collector: string;
  [key: string]: any;
}

export async function processCollectors(validData: CsvData[], userId: string) {
  const uniqueCollectors = [...new Set(validData.map(item => item.collector).filter(Boolean))];
  console.log('Processing collectors:', uniqueCollectors);
  
  const collectorIdMap = new Map<string, string>();

  for (const collectorName of uniqueCollectors) {
    try {
      const { data: existingCollectors, error: searchError } = await supabase
        .from('collectors')
        .select('id')
        .eq('name', collectorName);

      if (searchError) {
        console.error('Error searching for collector:', searchError);
        continue;
      }

      let collectorId: string;

      if (!existingCollectors || existingCollectors.length === 0) {
        const collectorData = await transformCollectorForSupabase(collectorName);
        const { data: newCollector, error: insertError } = await supabase
          .from('collectors')
          .insert(collectorData)
          .select('id')
          .single();

        if (insertError) {
          console.error('Error inserting collector:', insertError);
          continue;
        }

        collectorId = newCollector.id;
        console.log('Created new collector:', { id: collectorId, name: collectorName });
      } else {
        collectorId = existingCollectors[0].id;
        console.log('Using existing collector:', { id: collectorId, name: collectorName });
      }

      collectorIdMap.set(collectorName, collectorId);
    } catch (error) {
      console.error(`Error processing collector ${collectorName}:`, error);
    }
  }

  return collectorIdMap;
}

export async function processMembers(validData: CsvData[], collectorIdMap: Map<string, string>, userId: string) {
  for (const member of validData) {
    try {
      if (!member.collector) continue;

      const collectorId = collectorIdMap.get(member.collector);
      if (!collectorId) {
        console.error(`No collector ID found for ${member.collector}`);
        continue;
      }

      // Check for existing member
      const { data: existingMember } = await supabase
        .from('members')
        .select('id')
        .eq('member_number', member.member_number)
        .single();

      const memberData = transformMemberForSupabase(member);

      if (existingMember) {
        // Update existing member
        const { error: updateError } = await supabase
          .from('members')
          .update({
            ...memberData,
            collector_id: collectorId,
            collector: member.collector,
          })
          .eq('id', existingMember.id);

        if (updateError) {
          console.error('Error updating member:', updateError);
          throw updateError;
        }
      } else {
        // Insert new member
        const { error: insertError } = await supabase
          .from('members')
          .insert({
            ...memberData,
            collector_id: collectorId,
            collector: member.collector,
          });

        if (insertError) {
          console.error('Error inserting member:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Error processing member:', error);
      throw error;
    }
  }
}