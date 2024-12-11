import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual email authentication
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
    navigate("/admin");
  };

  const handleMemberIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual member ID authentication
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
    navigate("/admin");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement actual Google authentication
    toast({
      title: "Google login successful",
      description: "Welcome back!",
    });
    navigate("/admin");
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full mb-6 h-12 text-lg bg-white hover:bg-gray-50 border-2 shadow-sm text-gray-700 font-medium" 
            onClick={handleGoogleLogin}
          >
            <Icons.google className="mr-2 h-5 w-5 [&>path]:fill-[#4285F4]" />
            Continue with Google
          </Button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Tabs defaultValue="memberId" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="email" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="memberId"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Member ID
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login with Email
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="memberId">
              <form onSubmit={handleMemberIdSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="memberId">Member ID</label>
                  <Input
                    id="memberId"
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="memberPassword">Password</label>
                  <Input
                    id="memberPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login with Member ID
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}