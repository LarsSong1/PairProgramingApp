'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
    search: z.string().min(0).max(50),

})


export default function SearchBar() {
    const router = useRouter()
    const query = useSearchParams()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query.get('search') ?? ''

        },
    })

    const search = query.get('search')

    useEffect(() => {
        form.setValue("search", search ?? "" )
    },[search, form])


    // Definiendo funcion que se ejecutara al enviar el Formulario
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Invocar acciones del servidor para guardar datos en la base de datos
        // await createRoomActions(values);
        if (values.search) {
            router.push(`/browse?search=${values.search}`)
        } else {
            router.push("/browse")

        }

    }

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 flex-wrap">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="lg:w-80 bg-white dark:text-black border-black"
                                    placeholder="Javascript, Node" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-black hover:bg-orange-600 dark:text-black dark:bg-green-500" type="submit">
                    <SearchIcon size={15} />
                    Buscar
                </Button>

                {query.get("search") && (
                    <Button
                        variant='link'
                        onClick={()=>{
                            form.setValue("search", "")
                            router.push("/")
                        }}
                    >

                        Limpiar
                    </Button>

                )}

            </form>
        </Form>
    )
}
