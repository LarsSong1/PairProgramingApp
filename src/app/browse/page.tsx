import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getRooms } from '@/data-access/rooms';
import SearchBar from './search-bar';
import { RoomCard } from './room-card';
import { unstable_noStore } from 'next/cache';






export default async function Home({searchParams}:{searchParams : {search: string}}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  
  return (
    <main className="min-h-screen p-24">
      <div className='flex justify-between items-center w-full mb-8'>
        <div>
          <h1 className='text-4xl font-bold'>Busca salas</h1>
          <p className="font-light text-sm">De tu interes</p>
        </div>
        <Button
        className="bg-black hover:bg-orange-600 dark:text-black dark:bg-green-500"
        asChild>
          <Link href={'/create-room'}>
            Crear Sala
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className='grid lg:grid-cols-3  gap-4'>
        {rooms.map(room => {
          return <RoomCard key={room.id} room={room} />
        })}
      </div>


      {rooms.length === 0 && (
        <div>No hay Salas</div>
      )}

    </main>
  );
}
