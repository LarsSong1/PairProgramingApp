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
import { GithubIcon } from 'lucide-react';
import TagsList from '@/components/tags-list';

import { splitTags } from '@/lib/utils';



export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="bg-white">
      <CardHeader className="text-black">
        <CardTitle>{room.name}</CardTitle>
        <CardDescription className="text-black font-light">{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {
          room.githubRepo && (
            <Link href={room.githubRepo} className='flex items-center gap-2 text-black'
              target='_blank'
            >
              <GithubIcon className="text-black"/>
              Repositorio Github
            </Link>
          )
        }
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="dark:bg-green-500 dark:hover:bg-green-700 dark:hover:text-white border-black border-2 border-l-0 border-t-0 bg-orange-500 text-black hover:bg-orange-600 hover:text-white" asChild>
          <Link href={`/rooms/${room.id}`}>
            Unirte
          </Link>
        </Button>
      </CardFooter>
    </Card>

  )
}
