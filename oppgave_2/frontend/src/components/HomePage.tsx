"use client"

import useHappening from "@/hooks/useHappening";
import Order from "./Order";

export default function HomePage() {
    const { addHappeningData, happening, setHappening } = useHappening()

    return(
        <>
            <section>
                <a href="/Bestillinger">
                <p>Finn arrangement her:</p>
                    <Order happening={happening} />
                </a>
            </section>
        </>
    )
}