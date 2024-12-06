"use client"

import useHappening from "@/hooks/useHappening";
import Order from "./Order";
import Admin from "./Admin";

export default function HomePage() {
    const { addHappeningData, happening, setHappening } = useHappening()

    return(
        <>
            <main className="p-4 flex flex-col">
                <h1 className="text-3xl font-bold">Finn nytt arrangement</h1>
                <a href="/Bestillinger">
                <p>Finn arrangement her:</p>
                </a>
                    <Order happening={happening} />
                    <Admin />
            </main>
        </>
    )
}