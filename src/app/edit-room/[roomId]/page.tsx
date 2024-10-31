import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";


    
export default async function EditRoomPage({ params }: { params: { roomId: string } }) {

    unstable_noStore()
    const room = await getRoom(params.roomId)



    if (!room) {
        return <div>No hay sala</div>
    }
    return (
        <div className=" mx-auto flex flex-col gap-8 pt-12 pb-24 p-4 dark:bg-black bg-white">
            <div className="container mx-auto mt-20">
                <h1 className="text-4xl font-bold mb-4 ">Editar</h1>
                <EditRoomForm room={room} />

            </div>
        </div>
    )
}