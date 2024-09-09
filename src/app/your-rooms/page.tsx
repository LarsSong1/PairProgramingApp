import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { getUserRooms } from '@/data-access/rooms';
import { UserRoomCard } from './user-room-cards';
import { unstable_noStore } from 'next/cache';





export default async function YourRoomsPage() {
    unstable_noStore();
    const rooms = await getUserRooms();

    return (
        <main className="min-h-screen p-24">
            <div className='flex justify-between items-center w-full mb-8'>
                <h1 className='text-4xl'>Tus salas</h1>
                <Button asChild>
                    <Link href={'/create-room'}>
                        Crear Sala
                    </Link>
                </Button>
            </div>



            <div className='grid grid-cols-3 gap-4'>
                {rooms.map(room => {
                    return <UserRoomCard key={room.id} room={room} />
                })}
            </div>

        </main>
    );
}
