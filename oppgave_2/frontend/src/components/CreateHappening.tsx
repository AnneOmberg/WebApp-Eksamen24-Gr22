"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";
import useHappening from "@/hooks/useHappening";

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
  location: any;
  id: string;
  title: string;
  description: string;
  allowedWeekdays: string[];
  isFree: boolean;
  hasFixedPrice: boolean;
  price?: number;
}

export default function CreateHappening() {
  const { createHappening } = useHappening();
  const { templateId } = useParams() as { templateId: string };
  const [template, setTemplate] = useState<Template | null>(null);
  const { getSingleTemplate } = useTemplate();
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    date: "",
    description: "",
    location: "",
    category: "",
    seats: "",
    price: "",
    status: "",
    createdById: 1, //Her bør man legge til en brukerid, men det er ikke gjort noen sjekk mot tilgjengelige brukere i denne oppgaven
  });
  const router = useRouter();

  useEffect(() => {
    const fetchTemplate = async () => {
      const fetchedTemplate = await getSingleTemplate(templateId);
      setTemplate(fetchedTemplate);
      setFormData((prevData: any) => ({
        ...prevData,
        title: fetchedTemplate.title,
        slug: fetchedTemplate.title.toLowerCase().replace(/\s/g, "-"),
        description: fetchedTemplate.description,
        location: fetchedTemplate.location,
        category: fetchedTemplate.title,
        price: fetchedTemplate.price,
        status: "active",
      }));
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId, getSingleTemplate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData: any) => ({ ...prevData, [id]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      seats: formData.seats ? parseInt(formData.seats, 10) : null,
    };
    try {
      await createHappening(formDataToSend);
      alert("Form submitted successfully!");
      router.push("/newevent/templates");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Nytt arrangement med mal: {template.title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Tittel
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            readOnly={!template?.title}
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            readOnly={!template?.title}
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Dato
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Beskrivelse
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            readOnly={!!template?.description}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Sted
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            readOnly={!!template?.location}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Kategori
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="seats"
            className="block text-sm font-medium text-gray-700"
          >
            Antall plasser
          </label>
          <input
            type="number"
            id="seats"
            value={formData.seats}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Pris
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            readOnly={!!template?.price}
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Legg til
        </button>
      </form>
    </div>
  );
}
