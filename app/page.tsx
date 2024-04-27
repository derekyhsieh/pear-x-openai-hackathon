'use client';
import Image from "next/image";
import { User, createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers'
import { useState, useEffect } from 'react';
import { UserProvider, useUser } from './UserContext';
import { NavBar } from './NavBar';
import { GoogleSignInButton } from "./GoogleSignIn";

const supabaseUrl : string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey : string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {

  const user = useUser();

  

  return (
    <div>
      <NavBar />
    </div>
  );
}
