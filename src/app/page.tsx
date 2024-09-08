import { Button } from '@/components/ui/button';
import { db } from '@/db'
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
import { GithubIcon } from 'lucide-react';
import { getRooms } from '@/data-access/rooms';
import TagsList, { splitTags } from '@/components/tags-list';


function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
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
      <TagsList tags={splitTags(room.tags)}/>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>
            Unirte
          </Link>
        </Button>
      </CardFooter>
    </Card>

  )
}


export default async function Home() {
  const rooms = await getRooms();
  return (
    <main className="min-h-screen p-24">
      <div className='flex justify-between items-center w-full mb-8'>
        <h1 className='text-4xl'>Busca salas Dev</h1>
        <Button asChild>
          <Link href={'/create-room'}>
            Crear Sala
          </Link>
        </Button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {rooms.map(room => {
          return <RoomCard key={room.id} room={room} />
        })}
      </div>

    </main>
  );
}
