import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { getUserRooms } from '@/data-access/rooms';
import { UserRoomCard } from './user-room-cards';
import { unstable_noStore } from 'next/cache';





export default async function YourRoomsPage() {
    unstable_noStore();
    const rooms = await getUserRooms();

    return (
        <main className="min-h-screen container mx-auto w-full px-4">
            <div className='flex justify-between items-center mb-8 flex-wrap'>
                <div className='mt-20'>
                    <h1 className='text-4xl font-bold'>Tus salas</h1>
                    <p className='font-light text-sm'>Puedes administrar tus salas aqui</p>
                </div>
                <Button className='bg-black dark:bg-green-500 hover:bg-orange-600 dark:font-bold mt-20' asChild>
                    <Link href={'/create-room'}>
                        Crear Sala
                    </Link>
                </Button>
            </div>



            <div className='grid lg:grid-cols-3 gap-4'>
                {rooms.map(room => {
                    return <UserRoomCard key={room.id} room={room} />
                })}
            </div>

        </main>
    );
}
