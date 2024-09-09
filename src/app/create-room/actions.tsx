'use server'

import { createRoom } from "@/data-access/rooms";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomActions(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession()
    if (!session) throw new Error("Deberias estar logeado para crear esta sala")



    const room = await createRoom(roomData, session.user.id);

    revalidatePath('/')
    return room
}