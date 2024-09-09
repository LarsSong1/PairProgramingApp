'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from '@/db/schema';
import { GithubIcon, TrashIcon } from 'lucide-react';
import TagsList from '@/components/tags-list';
import { splitTags } from '@/lib/utils';
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
} from "@/components/ui/alert-dialog"
import { deleteRoomAction } from './actions';
import { Pencil1Icon } from '@radix-ui/react-icons';




export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className='relative'>
        <Button size={'icon'} className='right-4 absolute'>
          <Link href={`/edit-room/${room.id}`}>

            <Pencil1Icon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {
          room.githubRepo && (
            <Link href={room.githubRepo} className='flex items-center gap-2'
              target='_blank'
            >
              <GithubIcon />
              Repositorio Github
            </Link>
          )
        }
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>
            Unirte
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'destructive'}
              onClick={() => {

              }}
            >
              <TrashIcon className='w-4 h-4' />
              Borrar sala
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Estas seguro que quieres borrar la sala? no podras recuperarla
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                // Borrar sala
                deleteRoomAction(room.id)
              }}>
                Borrar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </CardFooter>
    </Card>

  )
}
