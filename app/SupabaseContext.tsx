'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const useSupabase = () => useContext(SupabaseContext);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function SupabaseProvider({ children }: any) {
  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
}
