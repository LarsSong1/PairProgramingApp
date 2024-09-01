"use client"

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'

export function Header() {
    const sesion = useSession();
    return (
        <header>
            <div>
                {
                    sesion.data ? (
                        <Button onClick={()=>signOut()}>
                            Sign Out
                        </Button>
                    ): (
                        <Button onClick={()=>signIn("google")}>
                            Sign in
                        </Button>
                    )
                }
                {sesion.data?.user.name}
                <ModeToggle />
            </div>
        </header>
    )
}
