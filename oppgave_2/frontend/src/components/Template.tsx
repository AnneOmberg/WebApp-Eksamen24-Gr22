"use client";

import Link from "next/link";

const weekdays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    description: string;
    allowedWeekdays: string[];
    isFree: boolean;
    hasFixedPrice: boolean;
    price?: number;
  };
  deleteTemplate: (id: string) => void;
}

export default function TemplateCard({
  template,
  deleteTemplate,
}: TemplateCardProps) {
  return (
    <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-2xl font-semibold mb-2">{template.title}</h3>
      <p className="text-gray-700 mb-4">{template.description}</p>

      <div className="flex flex-wrap space-x-2 mb-4">
        {template.allowedWeekdays.length === weekdays.length ? (
          <span className="px-3 py-1 my-1 bg-blue-300 rounded">
            Tillatt hver dag
          </span>
        ) : (
          template.allowedWeekdays.map((day: string) => (
            <span key={day} className="px-3 py-1 my-1 bg-orange-300 rounded">
              {day}
            </span>
          ))
        )}
        {template.isFree && (
          <span className="px-3 py-1 my-1 bg-green-300 rounded">Gratis</span>
        )}
        {template.hasFixedPrice && (
          <span className="px-3 py-1 my-1 bg-green-300 rounded">
            Fast pris {template.price} kr
          </span>
        )}
      </div>

      <div className="flex space-x-4">
        <Link
          href={`/newevent/templates/${template.id}`}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Bruk mal
        </Link>

        <Link
          href={`/templates/${template.id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          Rediger
        </Link>

        <button
          onClick={() => {
            deleteTemplate(template.id);
          }}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Slett
        </button>
      </div>
    </div>
  );
}
