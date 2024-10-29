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
                tags.map((tag) => (
                    <button
                        className={cn(badgeVariants(), "bg-black text-white dark:hover:bg-green-950 ")}
                        key={tag}
                        onClick={() => {
                            router.push(`/browse?search=${tag}`)
                        }}>
                        {tag}

                    </button>
                ))
            }
        </div>
    )
}
