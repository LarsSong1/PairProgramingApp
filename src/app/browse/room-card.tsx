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
        <TagsList tags={splitTags(room.tags)} />
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
