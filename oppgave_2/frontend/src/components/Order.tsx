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

    // useEffect(() => {
    //     const order
    //     const fetchData = async () => {
    //       if (orderSlug && hapSlug) {
    //         const lessonData = await getLesson(hapSlug, orderSlug);
    //         const courseData = await getCourse(hapSlug);
    //         const commentsData = await getComments(orderSlug);
    
    //         if (lessonData) {
    //           setLesson(lessonData);
    //         }
    //         setCourse(courseData);
    //         setComments(commentsData);
    //       }
    //     };
    //     fetchData();
    //   }, [orderSlug, hapSlug]);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       if (hapSlug && "order") {
    //         const hapData = await getHappening(hapSlug);
    //         setHappening(hapData);
    //       }
    //     };
    //     fetchData();
    //   }, [hapSlug]);

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
            {/* <Happening /> */}
        </>
    )
}