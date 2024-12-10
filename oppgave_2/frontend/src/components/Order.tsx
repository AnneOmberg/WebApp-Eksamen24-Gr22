"use client";

import useHappening from "@/hooks/useHappening";
import { FormType, PersonType } from "@/types/type";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Order() {
  // Chat GPT
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

  const handleInputChange = (formIndex: number, personIndex: number, field: keyof PersonType, value: string) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons[personIndex][field] = value;
    setNewForm(updatedForms);
  };

  const addParticipant = (formIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons.push({
      id: crypto.randomUUID(),
      name: "",
      email: "",
    });
    setNewForm(updatedForms);
  };

  const removeParticipant = (formIndex: number, personIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].persons = updatedForms[formIndex].persons.filter((_, i) => i !== personIndex);
    setNewForm(updatedForms);
  };

  return (
    <>
    <article>
      {newForm.map((form, formIndex) => (
        <section key={form.id}>
          <h2 className="text-2xl font-bold">{form.title}</h2>
          <form className="space-y-4">
            {form.persons.map((person, personIndex) => (
              <div key={person.id} className="flex space-x-4 items-center">
                  <label htmlFor={`name-${formIndex}-${personIndex}`}>Navn</label>
                  <input
                    id={`name-${formIndex}-${personIndex}`}
                    type="text"
                    value={person.name}
                    onChange={(e) => handleInputChange(formIndex, personIndex, "name", e.target.value)}
                    placeholder="Kari Normann"
                    required
                  />

                  <label htmlFor={`email-${formIndex}-${personIndex}`}>E-post</label>
                  <input
                    id={`email-${formIndex}-${personIndex}`}
                    type="email"
                    value={person.email}
                    onChange={(e) => handleInputChange(formIndex, personIndex, "email", e.target.value)}
                    placeholder="kari@norman.no"
                    required
                  />

                {form.persons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(formIndex, personIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Slett
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addParticipant(formIndex)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Legg til person
            </button>
          </form>
        </section>
      ))}
    </article>
    </>
  );
}
