"use client";

import Link from "next/link";
import { HappeningType } from "@/types/type";
import { useAdmin } from "@/context/AdminContext";

interface HappeningCardProps {
  happening: HappeningType;
  deleteHappening: (id: string) => void;
}

export default function HappeningCard({
  deleteHappening,
  happening,
}: HappeningCardProps) {
  const { isAdmin } = useAdmin();

  console.log(happening.participants.length);

  return (
    <>
      <article
        className={`flex flex-col w-96 h-96 m-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white p-4`}
        key={happening.id}
        data-testid="course_wrapper"
      >
        <section className="bg-gray-800 text-white p-4 rounded-t-md flex justify-between items-center">
          <h3 className="font-bold text-2xl" data-testid="courses_title">
            <Link href={`/happenings/${happening.slug}`}>
              {happening.title}
            </Link>
          </h3>
          <span className="block text-right capitalize">
            [{happening.category}]
          </span>
        </section>
        <section className="p-4">
          <ul className="mb-4">
            <li className="text-gray-700 mb-1">{happening.description}</li>
            <li className="text-gray-700 mb-1">
              <strong>Dato: </strong>
              {new Date(happening.date).toLocaleDateString("no-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
            <li className="text-gray-700 mb-1">
              <strong>Lokasjon:</strong> {happening.location}
            </li>
            <li className="text-gray-700 mb-1">
              <strong>Pris:</strong> {happening.price},-
            </li>
            {happening.seats === happening.participants.length ? (
              <li className="text-gray-700 mb-1">
                <strong>Fullbooket</strong>
              </li>
            ) : (
              <li className="text-gray-700 mb-1">
                <strong>Antall ledige plasser:</strong>{" "}
                {happening.seats - happening.participants.length}
              </li>
            )}
          </ul>
          <div className="flex justify-between items-center">
            {!isAdmin && (
              <button className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                {happening.participants.length < happening.seats ? (
                  <Link
                    className="font-semibold underline"
                    href={`/happenings/${happening.slug}/order`}
                  >
                    Kjøp billetter
                  </Link>
                ) : (
                  <Link
                    className="font-semibold underline"
                    href={`/happenings/${happening.slug}/order`}
                  >
                    Sett deg opp på venteliste
                  </Link>
                )}
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => deleteHappening(happening.id)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Slett
              </button>
            )}
            <Link
              className="text-blue-500 hover:underline"
              data-testid="courses_url"
              href={`/happenings/${happening.slug}`}
            >
              Info
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
