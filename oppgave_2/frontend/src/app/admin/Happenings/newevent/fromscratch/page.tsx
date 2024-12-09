"use client";

import useTemplate from "@/hooks/useTemplate";

export default function Page() {
  const { templates } = useTemplate();

  console.log(templates);

  return (
    <form action="" className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Tittel på arrangement
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="allowedWeekdays"
          className="block text-sm font-medium text-gray-700"
        >
          Tillatte ukedager
        </label>
        <input
          type="text"
          name="allowedWeekdays"
          id="allowedWeekdays"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Opprett arrangement
      </button>
    </form>
  );
}
