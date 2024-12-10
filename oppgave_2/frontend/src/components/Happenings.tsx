"use client";

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import HappeningCard from "@/components/Happening";

export default function Happenings() {
  const { isAdmin } = useAdmin();
  const { categories, happenings, setHappenings, deleteHappening } =
    useHappening();
  const [value, setValue] = useState<string>("");
  const [filteredHappenings, setFilteredHappenings] = useState<HappeningType[]>(
    []
  );

  console.log(filteredHappenings);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    setFilteredHappenings(happenings);
  }, [happenings]);

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);

    if (category) {
      const filtered = happenings?.filter((hap) =>
        hap?.category?.toLowerCase()?.includes(category?.toLowerCase())
      );
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
      setFilteredHappenings(happenings);
    }
  };

  const groupedHappenings = filteredHappenings.reduce((acc, hap) => {
    const date = new Date(hap.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(hap);

    return acc;
  }, {} as Record<number, Record<string, HappeningType[]>>);

  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isAdmin ? "Admin - Arrangementer" : "Finn nytt arrangement"}
        </h1>
        <label className="flex-col text-sm font-semibold" htmlFor="filter">
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
        <label className="flex-col text-sm font-semibold" htmlFor="filter">
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
      <section className="flex flex-col m-5" data-testid="courses">
        {Object.keys(groupedHappenings).length === 0 ? (
          <div className="text-center text-gray-500">
            Ingen arrangementer tilgjengelig
          </div>
        ) : (
          Object.entries(groupedHappenings).map(([year, months]) => (
            <div key={year}>
              <h3 className="text-2xl font-bold mb-4">{year}</h3>
              {Object.entries(months).map(([month, happenings]) => (
                <div key={month}>
                  <h4 className="text-xl font-semibold mb-2">{month}</h4>
                  {happenings.map((hap) => (
                    <HappeningCard
                      key={hap.id}
                      happening={hap}
                      deleteHappening={deleteHappening}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))
        )}
      </section>
    </>
  );
}
