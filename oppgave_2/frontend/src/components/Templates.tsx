"use client";

import useTemplate from "@/hooks/useTemplate";
import Link from "next/link";
import { useEffect } from "react";
import TemplateCard from "@/components/Template";

export default function Templates() {
  const { templates, getTemplates, deleteTemplate } = useTemplate();

  useEffect(() => {
    getTemplates();
  }, [templates]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Maler</h2>
      <div className="flex justify-end mb-6">
        <Link
          href="templates/create"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Lag ny mal
        </Link>
      </div>
      {templates && templates.length > 0 ? (
        templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            deleteTemplate={deleteTemplate}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">
          Ingen maler tilgjengelig
        </div>
      )}
    </div>
  );
}
