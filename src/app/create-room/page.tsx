import { CreateRoomForm } from "./create-room-form";


export default function CreateRoomPage() {
    return (
        <div className=" mx-auto flex flex-col gap-8 pt-12 pb-24 p-4 dark:bg-black bg-white">
            <div className="container mx-auto mt-20">
                <h1 className="text-4xl font-bold mb-4 ">Crear Sala</h1>
                <CreateRoomForm />
            </div>
        </div>
    )
}