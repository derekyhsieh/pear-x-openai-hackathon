'use client';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";
import { User, createClient } from '@supabase/supabase-js';
import { GoogleSignInButton } from "./GoogleSignIn";
import { useSupabase } from "./SupabaseContext";
import { useUser } from "./UserContext";


export function NavBar() {

    const supabase = useSupabase();
    const user = useUser();

    let loggedInOptions = (
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">{user?.user_metadata.name}</a>
          <button className="hover:bg-gray-700 px-3 py-2 rounded text-white bg-blue-500">Log Out</button>
        </div>
    );

    const handleLogin = async () => {
        console.log('handle login');
        const { data, error } = await supabase!.auth.signInWithOAuth({
          provider: 'google',
        });
        console.log(data);
    };

    let loggedOutOptions = (
        <div className="hidden md:flex space-x-4">
            <GoogleSignInButton callback={handleLogin} />
        </div>
    )

    return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          SupaThinka
        </div>
        <div className="md:hidden">
          <button>Menu</button>
        </div>

        {user ? loggedInOptions : loggedOutOptions}
        
      </div>
    </nav>
    );

}