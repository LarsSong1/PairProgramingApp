"use client"

import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";


export function splitTags(tags: string) {
    return tags.split(',').map((tag) => tag.trim())
}

export default function TagsList({ tags }: { tags: string[] }) {
    const router = useRouter()
    return (
        <div className="flex gap-2 flex-wrap">
            {
                tags.map((tag, id) => (
                    <button
                        className={cn(badgeVariants())}
                        key={id}
                        onClick={() => {
                            router.push(`/?search=${tag}`)
                        }}>


                        {tag}

                    </button>
                ))
            }
        </div>
    )
}
