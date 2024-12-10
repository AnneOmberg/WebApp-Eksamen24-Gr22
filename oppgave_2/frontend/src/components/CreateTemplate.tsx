"use client";

import useTemplate from "@/hooks/useTemplate";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const weekdays = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

export default function CreateTemplate() {
  const { addTemplate } = useTemplate();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    allowSameDay: false,
    allowedWeekdays: [] as string[],
    isPrivate: false,
    hasLimitedSeats: false,
    seatLimit: 0,
    hasFixedPrice: false,
    price: 0,
    isFree: false,
    hasWaitlist: false,
  });

  const [selectAll, setSelectAll] = useState(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [id]: newValue };

      if (id === "isFree" && checked) {
        updatedData.hasFixedPrice = false;
      } else if (id === "hasFixedPrice" && checked) {
        updatedData.isFree = false;
      }

      return updatedData;
    });
  };

  const handleWeekdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const allowedWeekdays = checked
        ? [...prevData.allowedWeekdays, value]
        : prevData.allowedWeekdays.filter((day) => day !== value);
      return { ...prevData, allowedWeekdays };
    });
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSelectAll(checked);
    setFormData((prevData) => ({
      ...prevData,
      allowedWeekdays: checked ? weekdays : [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const templateData = {
      ...formData,
      price: formData.price ? formData.price.toString() : null,
    };
    await addTemplate(templateData);
    router.push("../templates");
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Opprett mal</h2>
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
            onChange={handleFieldChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            onChange={handleFieldChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowSameDay"
            checked={formData.allowSameDay}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="allowSameDay"
            className="ml-2 block text-sm text-gray-900"
          >
            Tillat samme dag
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tillatte ukedager
          </label>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="selectAll"
              className="ml-2 block text-sm text-gray-900"
            >
              Velg alle
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {weekdays.map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={`weekday-${day}`}
                  value={day}
                  checked={formData.allowedWeekdays.includes(day)}
                  onChange={handleWeekdayChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`weekday-${day}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="isPrivate"
            className="ml-2 block text-sm text-gray-900"
          >
            Privat
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasLimitedSeats"
            checked={formData.hasLimitedSeats}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="hasLimitedSeats"
            className="ml-2 block text-sm text-gray-900"
          >
            Begrenset antall plasser
          </label>
        </div>
        {formData.hasLimitedSeats && (
          <div>
            <label
              htmlFor="seatLimit"
              className="block text-sm font-medium text-gray-700"
            >
              Antall plasser
            </label>
            <input
              type="number"
              id="seatLimit"
              value={formData.seatLimit}
              onChange={handleFieldChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasFixedPrice"
            checked={formData.hasFixedPrice}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="hasFixedPrice"
            className="ml-2 block text-sm text-gray-900"
          >
            Fast pris
          </label>
        </div>
        {formData.hasFixedPrice && (
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
              onChange={handleFieldChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFree"
            checked={formData.isFree}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isFree" className="ml-2 block text-sm text-gray-900">
            Gratis
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasWaitlist"
            checked={formData.hasWaitlist}
            onChange={handleFieldChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="hasWaitlist"
            className="ml-2 block text-sm text-gray-900"
          >
            Venteliste
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Lagre
        </button>
      </form>
    </section>
  );
}
