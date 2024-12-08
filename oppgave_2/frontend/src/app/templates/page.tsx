"use client";

import useTemplate from "@/hooks/useTemplate";
import { useEffect } from "react";

export default function Page() {
  const { templates, getTemplates } = useTemplate();

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Maler</h1>
      {templates?.map((template) => (
        <div
          key={template.id}
          className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2">{template.title}</h2>
          <p className="text-gray-700 mb-4">{template.description}</p>

          <div className="flex space-x-4">
            <a
              href={`/templates/${template.id}/order`}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Bruk mal
            </a>

            <a
              href={`/templates/${template.id}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Rediger
            </a>

            <a
              href={`/templates/${template.id}/delete`}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Slett
            </a>
            {template.allowSameDay && (
              <span className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md">
                Samme dag
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
