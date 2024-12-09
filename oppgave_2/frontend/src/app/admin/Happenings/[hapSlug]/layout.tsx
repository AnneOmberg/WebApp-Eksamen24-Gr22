"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useHappening from "@/hooks/useHappening";
import { HappeningType } from "@/types/type";

export default function HapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<HappeningType | null>(null);
  const { getHappening, happenings } = useHappening();

  // Hent dynamiske parametere fra URL
  const { hapSlug, infoSlug } = useParams() as {
    hapSlug: string;
    infoSlug: string;
  };

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
  console.log("Rendering lessons:", content)
  return (
    <div className="">
      {/* Hovedinnhold (children vil være leksjonen eller oversikten) */}
      <div>{children}</div>

      {/* Liste over deltakere */}
    
    </div>
  );
}