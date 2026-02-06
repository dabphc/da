import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleRedirect(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) handleRedirect(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleRedirect = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', userId)
      .single();
    
    // Strict member-only check
    if (!profile || !profile.role || !profile.is_active) {
      // Not a member - sign out immediately
      await supabase.auth.signOut();
      toast.error("Access Denied - Members Only! Contact an admin to join.");
      navigate("/");
      return;
    }
    
    // Redirect based on role
    if (profile.role === 'admin') {
      navigate("/admin");
    } else if (profile.role === 'member') {
      navigate("/dashboard");
    } else {
      // Unknown role - sign out
      await supabase.auth.signOut();
      toast.error("Access Denied - Members Only!");
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Designer Anonymous</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Members Only - Sign in with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            type="button" 
            className="w-full border-border hover:bg-secondary hover:text-secondary-foreground" 
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Sign in with Google
          </Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Not a member yet?</p>
            <p className="mt-1">Contact an admin to get access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;