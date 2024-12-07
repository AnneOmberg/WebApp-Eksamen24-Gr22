"use client"

import useHappening from "@/hooks/useHappening"
import Happening from "./Happening"
import { HappeningType } from "@/types/type"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Order() {
    const { happenings } = useHappening()
    // const { slug, id } = useParams() as { slug: string; id: string 
    //     orderSlug = slug as string;
    //     hapSlug = id as string;

    // };

    return (
        <>
            <article>
                <p>Bestill her:</p>
                {happenings?.map((hap) => (
                    <article key={hap.id}>
                        <h2><a href={`/bestillinger/${hap.id}`}>{hap.title}</a></h2>
                        <p>{hap.description}</p>
                    </article>
                ))}
                {/* <Link href={""}> */}
                {/* </Link> */}

            </article>
            <Happening />
        </>
    )
}