"use client";

import { HappeningType } from "@/types/type";

type HapType = {
  happening: HappeningType[];
};

export default function Happening({ happening }: HapType) {
  console.log("EVENT", happening);
  return (
    <section className="flex flex-wrap justify-center m-5">
      {happening?.map((hap) => (
        <article
          key={hap.id}
          className="w-80 p-4 m-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white"
        >
          <h2 className="font-bold text-2xl mb-2">{hap.title}</h2>
          <ul className="mb-4">
            <li className="text-gray-700 mb-1">{hap.description}</li>
            <li className="text-gray-700 mb-1">
              {new Date(hap.date).toLocaleDateString("no-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
            <li className="text-gray-700 mb-1">{hap.location}</li>
            <li className="text-gray-700 mb-1">{hap.price} kr</li>
            <li className="text-gray-700 mb-1">{hap.seats} plasser</li>
          </ul>
          <div className="flex justify-between items-center">
            <button className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
              <a href="">Kjøp billetter</a>
            </button>
            <a href="" className="text-blue-500 hover:underline">
              Info
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
