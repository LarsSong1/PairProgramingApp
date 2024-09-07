'use server'

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createRoomActions(roomData: Omit<Room, "id" | "userId">){
    const session = await getSession()
    if(!session) throw new Error("Deberias estar logeado para crear esta sala")
    await db.insert(room).values({...roomData, userId: session.user.id})


}