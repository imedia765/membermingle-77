import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}