'use server'

import { deleteUser } from "@/data-access/users"
import { getSession } from "@/lib/auth"


export async function deleteAccountAction() {
    const session = await getSession()

    if (!session){
        throw new Error("Debes estar logeado para borrar tu cuenta")
    }


    await deleteUser(session.user.id)

    
}