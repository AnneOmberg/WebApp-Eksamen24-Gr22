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
      <span className="block text-right capitalize">{content.category}</span>
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="mt-4">{content.description}</p>
      <p><strong>Pris:</strong> {content.price}kr</p>
      <p><strong>Dato:</strong> {new Date(content.date).toLocaleDateString("no-NO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
      <p><strong>Lokasjon:</strong> {content.location}</p>
      <p><strong>Plasser:</strong> {content.seats}</p>
      <p><strong>Status:</strong> {content.status}</p>
      <Link className="font-semibold underline" href={`/Happenings/${hapSlug}/order`}>Bestill her!</Link>
    </section>
  );
}