'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editRoomActions } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { Room } from "@/db/schema";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(50),
    tags: z.string().min(1).max(50),
})


export function EditRoomForm({room}: {room: Room}) {
    const router = useRouter()
    const params = useParams()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: room.name,
            description: room.description ?? '',
            githubRepo: room.githubRepo ?? '',
            tags: room.tags,
        },
    })



    // Definiendo funcion que se ejecutara al enviar el Formulario
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Invocar acciones del servidor para guardar datos en la base de datos
        await editRoomActions({
            id: params.roomId as string,
            ...values
        });
        // router.push("/")
        toast({
            title: "Sala editada",
            description: "La sala ha sido editada exitosamente",
            
        })
        
    }


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Estoy trabajando en un proyeto que" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este será tu nombre publico
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Describe tu sala o que estas codeando
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repositorio de Github</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Proporciona el link del repositorio de github
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lenguaje de Programación</FormLabel>
                            <FormControl>
                                <Input placeholder="JavaScript, Nextjs, ..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Especifica los lenguajes de programación que estas usando 
                                <h5 className="text-sm font-bold">Separa con &quot;,&quot si son varios lenguajes</h5>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>

    )


}