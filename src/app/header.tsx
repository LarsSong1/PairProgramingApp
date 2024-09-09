"use client"

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import Link from 'next/link';






function AccountDropdown() {
    const session = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'link'}>
                    <Avatar className='mr-2'>
                        <AvatarImage
                            src={session.data?.user?.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session.data?.user?.name}



                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut({
                    callbackUrl: '/',

                })}>
                    <LogOutIcon />
                    Salir
                </DropdownMenuItem>




            </DropdownMenuContent>
        </DropdownMenu>
    )

}


export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data
    return (
        <header className='py-2 dark:bg-gray-900 '>
            <div className='flex container mx-auto justify-between items-center '>
                <div>
                    <Link href="/" className='flex items-center gap-2 text-sm'>
                        <Image
                            width={'50'}
                            height={'50'}
                            alt='Logo'
                            src={""}
                        />
                        DevFinder
                    </Link>

                </div>
                <nav className='flex gap-4'>
                    {isLoggedIn && (

                        <>

                            <Link
                                className='hover:underline mx-auto'
                                href={'/browse'}>
                                Buscar
                            </Link>
                            <Link
                                className='hover:underline mx-auto'
                                href={'/your-rooms'}>
                                Mis Salas
                            </Link>
                        </>
                    )}
                </nav>
                <div className='flex items-center gap-4'>

                    {isLoggedIn && <AccountDropdown />}

                    {!isLoggedIn && (
                        <Button onClick={() => signIn('google')} variant='link'>
                            <LogInIcon />
                            Iniciar sesión
                        </Button>
                    )

                    }
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
