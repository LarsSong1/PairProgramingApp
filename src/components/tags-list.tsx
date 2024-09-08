import { Badge } from "./ui/badge";


export  function splitTags(tags:string) {
  return tags.split(',').map((tag) => tag.trim())
}

export default function TagsList({ tags }: { tags: string[] }) {
    return (
        <div className="flex gap-2 flex-wrap">
            {
                tags.map((tag, id) => (
                    <Badge key={id} className="w-fit" >{tag}</Badge>
                ))
            }
        </div>
    )
}
