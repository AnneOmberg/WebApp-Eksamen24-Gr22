"use client";

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

// interface HappeningsProps {
//   isAdmin?: boolean; // Optional prop
// }

export default function Happenings() {
  const { categories, happenings, setHappenings, deleteHappening } =
    useHappening();
  console.log("Happenings:", happenings); // Log happenings
  const [value, setValue] = useState<string>("");
  const [filteredHappenings, setFilteredHappenings] = useState<HappeningType[]>(
    []
  );
  console.log("Filtered happenings:", filteredHappenings); // Log filtered happenings
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Chat GPT
  useEffect(() => {
    setFilteredHappenings(happenings);
  }, [happenings]);

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);

    console.log("Handling filter, category:", category); // Log category
    if (category) {
      const filtered = happenings?.filter((hap) =>
        hap?.category?.toLowerCase()?.includes(category?.toLowerCase())
      );
      console.log("Filtered happenings:", filtered); // Log filtered array
      setFilteredHappenings(filtered);
    } else if (!category) {
      setFilteredHappenings(happenings);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;
    setValue(filterValue);
    let filtered = [...happenings];

    if (filterValue === "date_asc") {
      const sorted = filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setFilteredHappenings(sorted);
    } else if (filterValue === "date_desc") {
      const sorted = filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFilteredHappenings(sorted);
    } else if (filterValue === "alphabetical") {
      const sorted = filtered.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredHappenings(sorted);
    } else {
      setFilteredHappenings(happenings); // Reset if no filter selected
    }
  };

  const isLastItem = filteredHappenings.length - 1;

  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isAdmin ? "Admin - Arrangementer" : "Finn nytt arrangement"}
        </h1>
        <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
          <span className="mb-1 block">Velg kategori:</span>
          <select
            id="filter"
            name="filter"
            value={value}
            onChange={handleCategory}
            className="min-w-[200px] rounded bg-slate-200"
          >
            <option value="">Alle</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
          <span className="mb-1 block">Filtrer:</span>
          <select
            id="filter"
            name="filter"
            value={value}
            onChange={handleFilter}
            className="min-w-[200px] rounded bg-slate-200"
          >
            <option value="">Alle</option>
            <option value="date_asc">Dato først</option>
            <option value="date_desc">Dato sist</option>
            <option value="alphabetical">Alfabetisk</option>
          </select>
        </label>
      </header>

      <section
        className={`flex flex-wrap m-5 ${
          filteredHappenings.length > 1 && filteredHappenings.length % 2 === 1
            ? "justify-start"
            : "justify-center"
        }`}
        data-testid="courses"
      >
        {filteredHappenings && filteredHappenings.length > 0 ? (
          filteredHappenings.map((hap, i) => (
            <article
              className={`w-5/12 min-h-max m-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white p-4 ${
                i === filteredHappenings.length - 1 ? "last-item-style" : ""
              }`}
              key={hap.id}
              data-testid="course_wrapper"
            >
              <section className="bg-gray-800 text-white p-4 rounded-t-md flex justify-between">
                <h3
                  className="font-bold text-2xl mb-2"
                  data-testid="courses_title"
                >
                  <Link
                    href={
                      isAdmin
                        ? `/admin/Happenings/${hap.slug}`
                        : `/Happenings/${hap.slug}`
                    }
                  >
                    {hap.title}
                  </Link>
                </h3>
                <span className="block text-right capitalize">
                  [{hap.category}]
                </span>
              </section>
              <section className="p-4">
                <ul className="mb-4">
                  <li className="text-gray-700 mb-1">{hap.description}</li>
                  <li className="text-gray-700 mb-1">
                    {new Date(hap.date).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                  <li className="text-gray-700 mb-1">{hap.location}</li>
                  <li className="text-gray-700 mb-1">{hap.price} kr</li>
                  <li className="text-gray-700 mb-1">{hap.seats} plasser</li>
                </ul>
                <div className="flex justify-between items-center">
                  {!isAdmin && (
                    <button className="border-2 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                      <Link
                        className="font-semibold underline"
                        href={`/Happenings/${hap.slug}/order`}
                      >
                        Kjøp biletter
                      </Link>
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => deleteHappening(hap.id)}
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Slett
                    </button>
                  )}
                  <Link
                    className="text-blue-500 hover:underline"
                    data-testid="courses_url"
                    href={`/Happenings/${hap.slug}`}
                  >
                    Info
                  </Link>
                </div>
              </section>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen arrangementer</p>
        )}
      </section>
    </>
  );
}
