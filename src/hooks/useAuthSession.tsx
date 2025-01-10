import { useState, useEffect } from "react";
import { Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSignOut = async (skipStorageClear = false) => {
    try {
      console.log('Starting sign out process...');
      setLoading(true);
      
      // Clear all queries first
      await queryClient.resetQueries();
      await queryClient.clear();
      
      // Only clear storage if not skipping (during login flow)
      if (!skipStorageClear) {
        localStorage.clear();
        sessionStorage.clear();
      }
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
      setSession(null);
      
      // Add a small delay to ensure state is fully cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Force a clean page reload to clear any remaining state
      window.location.reload();
      
    } catch (error: any) {
      console.error('Error during sign out:', error);
      let description = "An unexpected error occurred";
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        description = "Network error. Please check your connection and try again.";
      } else if (error.message?.includes('502')) {
        description = "Server error. Please try again later.";
      } else {
        description = error.message;
      }
      
      toast({
        title: "Error signing out",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = async (error: AuthError) => {
    console.error('Auth error:', error);
    
    if (error.message.includes('refresh_token_not_found') || 
        error.message.includes('invalid refresh token')) {
      console.log('Token refresh failed, signing out...');
      await handleSignOut();
      
      toast({
        title: "Session Expired",
        description: "Please sign in again",
        variant: "destructive",
      });
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        console.error(`Attempt ${i + 1} failed:`, error);
        
        if (i === maxRetries - 1) {
          throw error;
        }
        
        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
          const delay = Math.min(1000 * Math.pow(2, i), 5000); // Cap at 5 seconds
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw error;
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    console.log('Initializing auth session...');
    
    const initializeSession = async () => {
      try {
        setLoading(true);
        console.log('Fetching current session...');
        
        const { data: { session: currentSession }, error } = await retryWithBackoff(() => 
          supabase.auth.getSession()
        );
        
        if (error) {
          console.error('Session fetch error:', error);
          await handleAuthError(error);
          return;
        }
        
        if (mounted) {
          setSession(currentSession);
          if (currentSession?.user) {
            console.log('Session initialized for user:', currentSession.user.id);
            // Force a page reload after successful login
            window.location.reload();
          } else {
            console.log('No active session found');
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
          }
        }
      } catch (error: any) {
        console.error('Session initialization error:', error);
        if (mounted) {
          await handleSignOut();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      console.log('Auth state changed:', {
        event,
        hasSession: !!currentSession,
        userId: currentSession?.user?.id
      });
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !currentSession) {
        console.log('User signed out or token refresh failed');
        await handleSignOut();
        return;
      }

      if (event === 'SIGNED_IN') {
        setSession(currentSession);
        await queryClient.invalidateQueries();
        // Force a page reload after successful login
        window.location.reload();
      }
      
      setLoading(false);
    });

    initializeSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [queryClient, toast]);

  return { session, loading, handleSignOut };
}