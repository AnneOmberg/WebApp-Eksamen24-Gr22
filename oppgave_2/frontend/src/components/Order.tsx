"use client"

import useHappening from "@/hooks/useHappening"
// import Happening from "./Happening"
import { HappeningType } from "@/types/type"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function Order() {
    const { happenings } = useHappening()
    const { hapSlug, orderSlug } = useParams() as {
        hapSlug: string
        orderSlug: string
      };

      const eventFilter = happenings?.filter((hap) => hap.slug === hapSlug)

    return (
        <>
            <article>
                <p>Bestill her:</p>
                {eventFilter?.map((hap) => (
                    <article key={hap.id}>
                        <h2 className="text-2xl font-bold"><a href={`/bestillinger/${hap.id}`}>{hap.title}</a></h2>
                        <p>{hap.description}</p>
                    </article>
                ))}
                {/* <Link href={""}> */}
                {/* </Link> */}

            </article>
            {/* <Happening /> */}
        </>
    )
}

// import useHappening from "@/hooks/useHappening";
// import Happening from "./Happenings";
// import { HappeningType } from "@/types/type";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// type OrderType = {
//   happening: HappeningType[];
// };

// export default function Order({ happening }: OrderType) {
//   // const { slug, id } = useParams() as { slug: string; id: string
//   //     orderSlug = slug as string;
//   //     hapSlug = id as string;

//   // };

//   return (
//     <>
//       <article>
//         <p>Bestill her:</p>
//         {happening?.map((hap, i) => (
//           <article key={i}>
//             <h2>
//               <a href={`/bestillinger/${hap.id}`}>{hap.title}</a>
//             </h2>
//             <p>{hap.description}</p>
//           </article>
//         ))}
//         {/* <Link href={""}> */}
//         {/* </Link> */}
//       </article>
//       <Happening happening={happening} />
//     </>
//   );
// }

