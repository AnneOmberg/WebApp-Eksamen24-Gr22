"use client"

import { HappeningType } from "@/types/type"
import { useParams } from "next/navigation"

type HapType = {
    happening: HappeningType[]
}

export default function Happening({happening}: HapType) {
    // const { slug, id } = useParams() as {
    //     orderSlug = slug as string;
    //     hapSlug = id as string;
    // };

    console.log("EVENT", happening)
    return (
        <section>
            {happening?.map((hap) => (
                <h1 key={hap.id}>{hap.title}</h1>
            ))}
        </section>
    )
}