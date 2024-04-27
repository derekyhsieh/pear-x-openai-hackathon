'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import { useSupabase } from './SupabaseContext';

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    const subscription = supabase!.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session!.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
