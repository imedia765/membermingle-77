import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            PWA
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </Link>
          <Button variant="default" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}