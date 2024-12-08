"use client"

import { HappeningType } from "@/types/type"
import Link from "next/link"
import { useState } from "react"

// type AdminType = {
//     happening: HappeningType[]
// }

export default function Admin() {
    const [temp, setTemp] = useState<HappeningType[]>([])

    return(
        <>
            <section>
                <h2>Nytt arrangement</h2>
                <Link href={`/admin/ny-mal`}><p>Ny mal</p></Link>
                <Link href={``}><p>Basert på mal</p></Link>
                <Link href={``}><p>Fra sratch</p></Link>
                {/* <button className="flex px-2 py-px float-right bg-red-600 rounded-full" onClick={() => deleteHappening(hap.id)} type="button">X</button> */}
            </section>
        </>
    )
}