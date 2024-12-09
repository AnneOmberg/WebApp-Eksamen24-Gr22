"use client";

import useHappening from "@/hooks/useHappening";
import { useState } from "react";

type OrderType = {
  happening: any[];
};

type Participant = {
  name: string;
  email: string;
};

export default function Order({ happening }: OrderType) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { happenings, setHappenings } = useHappening();

  console.log(happenings);

  const addParticipant = () => {
    setParticipants([...participants, { name, email }]);
    setName("");
    setEmail("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Participants</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addParticipant();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Participant
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6">Participants List</h3>
      <ul className="mt-4 space-y-2">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm"
          >
            <span>
              {participant.name} ({participant.email})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
