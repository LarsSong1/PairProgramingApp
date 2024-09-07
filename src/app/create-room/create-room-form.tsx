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
import { createRoomActions } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(50),
    language: z.string().min(1).max(50),
})


export function CreateRoomForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            language: "",
        },
    })



    // Definiendo funcion que se ejecutara al enviar el Formulario
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Invocar acciones del servidor para guardar datos en la base de datos
        await createRoomActions(values);
        router.push("/")
        
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
                                <Input {...field} />
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
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lenguaje de Programación</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Especifica el lenguaje de programación que estas usando
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