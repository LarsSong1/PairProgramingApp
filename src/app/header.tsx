"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { deleteAccountAction } from "./actions";
import { Router, useRouter } from "next/router";
import darkLogo from "../img/darkDev.svg"
import normalLogo from "../img/whiteDev.svg"
import { useTheme } from "next-themes";


function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);


  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Estas seguro de borrar tu cuenta?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {

                await deleteAccountAction()
                signOut({ callbackUrl: '/' })
              }}
            >
              Si Borrar mi cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {session.data?.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Salir
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Borrar Cuenta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;


  const { theme } = useTheme()

  const logoSrc = theme === "dark" ? darkLogo : normalLogo;

  return (
    <header className="bg-white py-2 absolute dark:bg-black z-10 left-0 top-0 w-full h-20 flex items-center justify-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src={logoSrc}
            className="w-24"
            alt="the application icon of a magnifying glass"
          />
        </Link>

        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Salas
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Mis Salas
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Entrar
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}