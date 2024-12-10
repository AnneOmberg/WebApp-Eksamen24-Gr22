"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation"; // Correct import
import useHappening from "@/hooks/useHappening";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export default function Info() {
  const { hapSlug, orderSlug } = useParams() as {
    hapSlug: string
    orderSlug: string
  }; // Get dynamic route parameter
  const { happenings, getHappening } = useHappening();
  const [content, setContent] = useState<HappeningType | null>(null);
  const { isAdmin } = useAdmin();


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
      {/* <span className="block text-right capitalize">{content.category}</span> */}
      <section className="flex justify-between">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <section>
          <p><strong>Dato: </strong>{new Date(content.date).toLocaleDateString("no-NO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Lokasjon:</strong> {content.location}</p>
        </section>
      </section>
      <p className="mt-4">{content.description}</p>
      <p><strong>Pris:</strong> {content.price},-</p>
      {content.status === true ?
        <p><strong>Fullboket</strong></p>
        :
        <p><strong>Ledige plasser:</strong> {content.seats}</p>
      }
      {!isAdmin && (
        <button className="border-2 bg-blue-500 px-4 py-2 mt-4 rounded text-white hover:bg-blue-600">
          {content.status === false ?
            <Link className="font-semibold underline" href={`/happenings/${hapSlug}/order`}>Kjøp biletter</Link> : <Link className="font-semibold underline" href={`/happenings/${hapSlug}/order`}>Sett deg opp på ventelise</Link>}
        </button>
      )}
    </section>
  );
}