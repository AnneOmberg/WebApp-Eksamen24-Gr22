"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct import
import useHappening from "@/hooks/useHappening";
import { HappeningType } from "@/types/type";
import Link from "next/link";

export default function Info() {
  const { hapSlug, orderSlug } = useParams() as {
    hapSlug: string
    orderSlug: string
  }; // Get dynamic route parameter
  const { happenings, getHappening } = useHappening();
  const [content, setContent] = useState<HappeningType | null>(null);

  useEffect(() => {
    const getContent = async () => {
      if (hapSlug) {
        const data = await getHappening(hapSlug);
        console.log("Fetched course data:", data);
        setContent(data as HappeningType);
      }
    };
    getContent();
  }, [hapSlug, happenings]);

  useEffect(() => {
    console.log("Updated content:", content); // Log whenever content changes
  }, [content]);
  

  // Sjekk at kurset ble lastet
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <section>
        {/* <ul data-testid="lessons">
        {happenings?.map((hap: any) => (
            <li
              key={hap?.id}
              className={`text-sm mb-4 w-full rounded-lg border px-4 py-2 ${
                orderSlug === hap?.slug ? "bg-emerald-300" : "bg-transparent"
              }`}
            >
              <Link
                href={`/Happenings/${hapSlug}/order${hap?.slug}`}
                className="block"
              >
                {hap?.title}
              </Link>
            </li>
           ))
          }
        </ul> */}
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="mt-4">{content.description}</p>
      <Link href={`/Happenings/${hapSlug}/order${orderSlug}`}>Bestill her!</Link>
    </section>
  );
}