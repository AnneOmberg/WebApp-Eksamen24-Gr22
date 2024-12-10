"use client";

import useHappening from "@/hooks/useHappening";
import type { FormType, PersonType } from "@/types/type";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Order() {
  const { hapSlug } = useParams() as { hapSlug: string };
  const { happenings, updateHappening } = useHappening();
  const eventFilter = happenings?.find((hap) => hap.slug === hapSlug);

  const [newForm, setNewForm] = useState<FormType[]>([]);

  useEffect(() => {
    if (eventFilter) {
      setNewForm([
        {
          id: crypto.randomUUID(),
          title: eventFilter.title,
          participants: [{ id: crypto.randomUUID(), name: "", email: "" }],
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
    updatedForms[formIndex].participants[personIndex][field] = value;
    setNewForm(updatedForms);
  };

  const addParticipant = (formIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].participants.push({
      id: crypto.randomUUID(), //Co-pilot
      name: "",
      email: "",
    });
    setNewForm(updatedForms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEvent = {
      ...eventFilter,
      participants: newForm.flatMap((form) => form.participants),
    };

    try {
      await updateHappening(updatedEvent);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  const removeParticipant = (formIndex: number, personIndex: number) => {
    const updatedForms = [...newForm];
    updatedForms[formIndex].participants = updatedForms[
      formIndex
    ].participants.filter((_: any, i: number) => i !== personIndex);
    setNewForm(updatedForms);
  };

  // Chat GPT
  // Calculate total price based on number of participants
  const calculateTotalPrice = () => {
    const totalParticipants = newForm.reduce(
      (acc, form) => acc + form.participants.length,
      0
    );
    return eventFilter ? totalParticipants * eventFilter.price : 0;
  };

  return (
    <>
      <article>
        {newForm.map((form, formIndex) => (
          <section key={form.id}>
            <h2 className="text-2xl font-bold">{form.title}</h2>
            <form className="space-y-4 w-fit" onSubmit={handleSubmit}>
              <section className="flex gap-8">
                {form.participants.map((person, personIndex) => (
                  <div key={person.id} className="flex flex-col">
                    <label
                      htmlFor={`name-${formIndex}-${personIndex}`}
                      className="mt-4"
                    >
                      Navn
                    </label>
                    <input
                      id={`name-${formIndex}-${personIndex}`}
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        handleInputChange(
                          formIndex,
                          personIndex,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Kari Normann"
                      required
                    />

                    <label
                      htmlFor={`email-${formIndex}-${personIndex}`}
                      className="mt-4"
                    >
                      E-post
                    </label>
                    <input
                      id={`email-${formIndex}-${personIndex}`}
                      className="rounded"
                      type="email"
                      value={person.email}
                      onChange={(e) =>
                        handleInputChange(
                          formIndex,
                          personIndex,
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="kari@norman.no"
                      required
                    />

                    {form.participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeParticipant(formIndex, personIndex)
                        }
                        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                      >
                        Slett
                      </button>
                    )}
                  </div>
                ))}
              </section>

              <button
                type="button"
                onClick={() => addParticipant(formIndex)}
                className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 w-80"
              >
                Legg til person
              </button>
              {eventFilter?.participants.length < eventFilter?.seats ? (
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    Total pris: {calculateTotalPrice()} kr
                  </p>
                  <button
                    type="submit"
                    className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 w-80"
                  >
                    Bestill billetter
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 w-80"
                >
                  Sett deg opp på venteliste
                </button>
              )}
            </form>
          </section>
        ))}
      </article>
    </>
  );
}
