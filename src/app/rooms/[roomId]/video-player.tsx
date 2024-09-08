'use client'

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@/db/schema';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    Call,
    StreamTheme,
    SpeakerLayout,
    CallControls
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from './actions';

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2FlMjgwNjgtMzIxNS00ZjY1LWIyM2ItMmQ1NGYxNTAzNDRkIn0.ddW6ouOzF5KuJUVrcQnLb6NxSzukI2-406aR3qXn_9o';


export function DevTogetherVideo({ room }: { room: Room }) {
    const session = useSession();
    console.log(session.data?.user.id)
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        if (!room) return;
        if (!session.data) return;
        const userId = session.data.user.id;
        console.log(userId);
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: userId,
            },
            tokenProvider: ()=> generateTokenAction(),
        });
        setClient(client);
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call);


        return () => {
            call.leave()
            client.disconnectUser()
        }

    }, [session, room])


    return (
        client &&
        call && (
            <StreamVideo  client={client}>
                <StreamTheme>
                    <StreamCall  call={call}>
                        <SpeakerLayout/>
                        <CallControls/>

                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    )
};