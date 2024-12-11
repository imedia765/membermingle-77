import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw, FileJson } from "lucide-react";
import { transformMemberData } from "@/utils/dataTransform";
import { useToast } from "@/components/ui/use-toast";

export default function Database() {
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const transformedData = transformMemberData(jsonData);

      // Create a blob with the transformed data
      const blob = new Blob([JSON.stringify(transformedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'transformed-members.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data transformed successfully",
        description: "Your data has been processed and downloaded with new member numbers.",
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error processing file",
        description: "Please ensure you've uploaded a valid JSON file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Database Management
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transform Member Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload your JSON file to transform member data and generate new member numbers.
              The processed file will be automatically downloaded.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="json-upload"
              />
              <label htmlFor="json-upload" className="w-full">
                <Button className="w-full flex items-center gap-2" variant="outline" asChild>
                  <span>
                    <FileJson className="h-4 w-4" />
                    Upload JSON File
                  </span>
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create a backup of the entire database. This includes all member records, payments, and system settings.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Backup
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Restore Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Restore the database from a previous backup file. Please ensure you have a valid backup file.
            </p>
            <Button className="w-full flex items-center gap-2" variant="outline">
              <Upload className="h-4 w-4" />
              Upload Backup
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Database Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Last Backup: 2024-02-15 14:30</p>
                <p className="text-sm text-muted-foreground">Database Size: 256 MB</p>
              </div>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}