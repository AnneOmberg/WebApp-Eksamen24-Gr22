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
        <section className="flex">
            {happening?.map((hap) => (
                <article key={hap.id} className="w-72 p-2 m-2 border-2 border-black">
                    <h2 className="font-bold text-2xl">{hap.title}</h2>
                    <ul>
                        <li>{hap.description}</li>
                        <li>{hap.event_type}</li>
                        <li>{hap.location}</li>
                        <li>{hap.price}</li>
                        <li>{hap.seats}</li>
                        <button className="border-2 bg-black text-white px-1"><a href="">Kjøp biletter</a></button>
                    </ul>
                </article>
            ))}
            {/* <form action="">
                <label htmlFor=""></label>
                <input type="text" />
            </form> */}
        </section>
    )
}