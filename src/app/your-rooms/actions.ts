'use server'

import { deleteRoom, getRoom } from "@/data-access/rooms"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache";


export async function deleteRoomAction(roomId: string) {
    const session = await getSession();


    if (!session){{
        throw new Error("Usuario no autenticado")
    }}

    const room = await getRoom(roomId)

    if (room?.userId !== session.user.id){
        throw new Error("No autorizado")
    }
    await deleteRoom(roomId);
    revalidatePath('/your-rooms')
}
