import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import TagsList from "@/components/tags-list";
import { DevTogetherVideo } from "./video-player";
import { splitTags } from "@/lib/utils";


function isValidUUID(uuid: any) {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexExp.test(uuid);
}

export default async function Roompage(props: { params: { roomId: string } }) {
    const roomId = props.params.roomId;

    // Verificar si el roomId es un UUID válido antes de hacer la consulta
    if (!isValidUUID(roomId)) {
        return <div>No se encontró sala con este ID</div>;
    }

    const room = await getRoom(roomId);

    if (!room) {
        return <div>No se encontró sala con este ID</div>;
    }


    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <DevTogetherVideo room={room}/>
                </div>
            </div>
            <div className="col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1>{room?.name}</h1>
                    {room.githubRepo && (
                        <Link
                            href={room.githubRepo}
                            className="flex items-center gap-2"
                            target="_blank"
                        >
                            <GithubIcon />
                            Repositorio Github
                        </Link>
                    )}
                    <p className="text-base text-gray-600">{room?.description}</p>
                    <h3>Tags</h3>
                    <TagsList tags={splitTags(room.tags)}/>



                </div>
            </div>
        </div>
    );
}
