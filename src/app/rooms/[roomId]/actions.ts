'use server'
import { getSession } from '@/lib/auth';
import { StreamChat } from 'stream-chat';


export async function generateTokenAction() {
    const session = await getSession();


    if (!session){
        throw new Error('Debes estar logeado para conectar a StreamChat');
    }

    const api_key= process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const api_secret = process.env.GET_STREAM_SECRET_KEY!

    // Iniciar servidor Cliente
    const serverClient = StreamChat.getInstance(api_key,api_secret);
    
    
    // Crear token para usuario
    const token = serverClient.createToken(session.user.id);
    return token;
}
