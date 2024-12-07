"use client"

import useHappening from "@/hooks/useHappening"
import { HappeningType } from "@/types/type"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Happening() {
    const { happenings, getHappening } = useHappening()
    const [content, setContent] = useState<HappeningType | null>(null);
    const { hapSlug, lessonSlug } = useParams() as {
        hapSlug: string;
        lessonSlug: string;
      };
    // const { slug, id } = useParams() as {
    //     orderSlug = slug as string;
    //     hapSlug = id as string;
    // };

    useEffect(() => {
        const getContent = async () => {
          if (hapSlug && happenings.length > 0) {
            const data = await getHappening(hapSlug);
            setContent(data as HappeningType);
          }
        };
        getContent();
      }, [hapSlug, happenings]);
    
      if (!happenings) {
        return <div>Loading...</div>;
      }

    console.log("EVENT", happenings)
    return (
        <section>
          <h2 className="text-2xl font-bold">{content?.title}</h2>
          <p className="mt-4">{content?.description}</p>
        </section>
    )
}