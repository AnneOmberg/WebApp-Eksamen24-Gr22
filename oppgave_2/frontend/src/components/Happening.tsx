"use client";

import Link from "next/link";
import { HappeningType } from "@/types/type";
import { useAdmin } from "@/context/AdminContext";

interface HappeningCardProps {
  happening: HappeningType;
  deleteHappening: (id: string) => void;
}

export default function HappeningCard({
  happening,
  deleteHappening,
}: HappeningCardProps) {
  const { isAdmin } = useAdmin();

  return (
    <section className={`flex flex-wrap m-5`} data-testid="courses">
    {happening && happening.length > 0 ? (
      happening.map((hap, i) => (
        <article
          className={`w-5/12 min-h-96 m-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white p-4 ${i === filteredHappenings.length - 1 ? "last-item-style" : ""}`}
          key={hap.id}
          data-testid="course_wrapper"
        >
          <section className="bg-gray-800 text-white p-4 rounded-t-md flex justify-between items-center">
            <h3
              className="font-bold text-2xl"
              data-testid="courses_title"
            >
              <Link
                href={
                  isAdmin
                    ? `/admin/Happenings/${hap.slug}`
                    : `/Happenings/${hap.slug}`
                }
              >
                {hap.title}
              </Link>
            </h3>
            <span className="block text-right capitalize">
              [{hap.category}]
            </span>
          </section>
          <section className="p-4">
            <ul className="mb-4">
              <li className="text-gray-700 mb-1">{hap.description}</li>
              <li className="text-gray-700 mb-1"><strong>Dato: </strong>
                {new Date(hap.date).toLocaleDateString("no-NO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </li>
              <li className="text-gray-700 mb-1"><strong>Lokasjon:</strong> {hap.location}</li>
              <li className="text-gray-700 mb-1"><strong>Pris:</strong> {hap.price},-</li>

              {hap.status === true ?
                <li className="text-gray-700 mb-1"><strong>Fullboket</strong></li>
                :
                <li className="text-gray-700 mb-1"><strong>Antall ledige plasser:</strong> {hap.seats}</li>
              }

            </ul>
            <div className="flex justify-between items-center">
              {!isAdmin && (
                <button className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                  {hap.status === false ?
                    <Link className="font-semibold underline" href={`/Happenings/${hap.slug}/order`}>Kjøp biletter</Link> : <Link className="font-semibold underline" href={`/Happenings/${hap.slug}/order`}>Sett deg opp på ventelise</Link>}
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => deleteHappening(hap.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Slett
                </button>
              )}
              <Link
                className="text-blue-500 hover:underline"
                data-testid="courses_url"
                href={
                  isAdmin
                    ? `/admin/Happenings/${hap.slug}`
                    : `/Happenings/${hap.slug}`
                }
              >
                Info
              </Link>
            </div>
          </section>
        </article>
      ))
  );
}
