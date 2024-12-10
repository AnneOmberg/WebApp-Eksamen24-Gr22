"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";

const weekdays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

interface Template {
  id: string;
  title: string;
  description: string;
  allowedWeekdays: string[];
  isFree: boolean;
  hasFixedPrice: boolean;
  price?: number;
}

export default function CreateHappening() {
  const { getSingleTemplate } = useTemplate();
  const { templateId } = useParams() as { id: any };
  const [template, setTemplate] = useState<Template | null>(null);

  console.log(templateId);

  useEffect(() => {
    getSingleTemplate(templateId).then((data) => {
      setTemplate(data);
      console.log(template);
    });
  }, [templateId]);

  return (
    <>
      <section className="flex flex-col max-w-xl">
        {template ? (
          <h1 className="text-2xl font-bold mb-4">
            Nytt arrangement med mal: {template?.title}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Nytt arrangement</h1>
        )}

        <div className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-700">Tittel</span>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
      </section>
    </>
  );
}
