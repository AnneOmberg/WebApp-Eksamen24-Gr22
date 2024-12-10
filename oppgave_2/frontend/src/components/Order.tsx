"use client";

import useHappening from "@/hooks/useHappening";
import type { FormType, PersonType } from "@/types/type";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Order() {
  const { hapSlug } = useParams() as { hapSlug: string };
  const { happenings } = useHappening();
  const eventFilter = happenings?.find((hap) => hap.slug === hapSlug);

  const [newForm, setNewForm] = useState<FormType[]>([]);

  useEffect(() => {
    if (eventFilter) {
      setNewForm([
        {
          id: crypto.randomUUID(),
          title: eventFilter.title,
          persons: [{ id: crypto.randomUUID(), name: "", email: "" }],
        },
      ]);
    }
  }, [eventFilter]);

  const handleInputChange = (
    formIndex: number,
    personIndex: number,
    field: keyof PersonType, // Co-pilot
    value: string
  ) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons[personIndex][field] = value;
    setNewForm(updatedForms);
  };

  const addParticipant = (formIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons.push({
      id: crypto.randomUUID(), //Co-pilot
      name: "",
      email: "",
    });
    setNewForm(updatedForms);
  };

  const removeParticipant = (formIndex: number, personIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons = updatedForms[formIndex].persons.filter(
      (_: any, i: number) => i !== personIndex
    );
    setNewForm(updatedForms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      if (response.ok) {
        alert("Participants added successfully!");
      } else {
        alert("Failed to add participants.");
      }
    } catch (error) {
      console.error("Error adding participants:", error);
      alert("An error occurred while adding participants.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Meld deg på {eventFilter?.title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {newForm.map((form, formIndex) => (
          <div key={form.id}>
            <h3 className="text-xl font-semibold mb-4">{form.title}</h3>
            {form.persons.map((person: PersonType, personIndex: number) => (
              <div key={person.id} className="mb-4">
                <label
                  htmlFor={`name-${formIndex}-${personIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Navn
                </label>
                <input
                  type="text"
                  id={`name-${formIndex}-${personIndex}`}
                  value={person.name}
                  onChange={(e) =>
                    handleInputChange(
                      formIndex,
                      personIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                <label
                  htmlFor={`email-${formIndex}-${personIndex}`}
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  E-post
                </label>
                <input
                  type="email"
                  id={`email-${formIndex}-${personIndex}`}
                  value={person.email}
                  onChange={(e) =>
                    handleInputChange(
                      formIndex,
                      personIndex,
                      "email",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                {form.persons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(formIndex, personIndex)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Fjern
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addParticipant(formIndex)}
              className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Legg til person
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Meld på
        </button>
      </form>
    </div>
  );
}
