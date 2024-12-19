import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "../ui/use-toast";

interface DesktopNavProps {
  isLoggedIn: boolean;
  handleLogout: () => Promise<void>;
}

export const DesktopNav = ({ isLoggedIn, handleLogout }: DesktopNavProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onLogout = async () => {
    try {
      await handleLogout();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-2">
      {isLoggedIn ? (
        <Button variant="outline" size="sm" onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
      )}
      <Link to="/register">
        <Button variant="default" size="sm">
          Register
        </Button>
      </Link>
      {isLoggedIn && (
        <Link to="/admin">
          <Button variant="outline" size="sm">
            Admin Panel
          </Button>
        </Link>
      )}
      <ThemeToggle />
    </div>
  );
};