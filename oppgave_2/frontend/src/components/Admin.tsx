import { HappeningType } from "@/types/type"
import { useState } from "react"

// type AdminType = {
//     happening: HappeningType[]
// }

export default function Admin() {
    const [temp, setTemp] = useState<HappeningType[]>([])

    return(
        <>
            <section>
                <h2>Maler</h2>
                {temp?.map((temp) => (
                    <form action="">
                        <label htmlFor=""></label>
                        <input type="text" />
                        
                        <label htmlFor=""></label>
                        <input type="text" />

                        <label htmlFor=""></label>
                        <input type="text" />

                        <label htmlFor=""></label>
                        <input type="text" />
                    </form>
                ))}
                {/* <button className="flex px-2 py-px float-right bg-red-600 rounded-full" onClick={() => deleteHappening(hap.id)} type="button">X</button> */}
            </section>
        </>
    )
}