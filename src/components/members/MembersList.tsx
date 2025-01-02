import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CreateMemberDialog from "./CreateMemberDialog";
import EditMemberDialog from "./EditMemberDialog";

export const MembersList = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { toast } = useToast();

  const { data: members, refetch } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Member deleted successfully",
    });
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Members</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2" />
          Add Member
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.member_number}</TableCell>
                <TableCell>{member.full_name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedMember(member);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateMemberDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => {
          refetch();
          setIsCreateOpen(false);
        }}
      />

      <EditMemberDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        member={selectedMember}
        onSuccess={() => {
          refetch();
          setIsEditOpen(false);
        }}
      />
    </div>
  );
};