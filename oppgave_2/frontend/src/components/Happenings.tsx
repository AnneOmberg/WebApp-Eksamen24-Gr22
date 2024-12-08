"use client"

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";


export default function Happenings() {
  const { categories, happenings, setHappenings, deleteHappening } = useHappening()
  const [value, setValue] = useState<string>("");
  const [filteredHappenings, setFilteredHappenings] = useState<HappeningType[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Chat GPT
  useEffect(() => {
    setFilteredHappenings(happenings);
  }, [happenings]);

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);

    console.log('Handling filter, category:', category); // Log category
    if (category) {
      const filtered = happenings?.filter((hap) =>
        hap?.category?.toLowerCase()?.includes(category?.toLowerCase())
      );
      console.log('Filtered happenings:', filtered); // Log filtered array
      setFilteredHappenings(filtered);
    } else if (!category) {
      setFilteredHappenings(happenings);
    }
  };

  // const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedCategory = event.target.value;
  //   setCategoryFilter(selectedCategory);

  //   // Filter happenings by category first
  //   let filtered = happenings;

  //   if (selectedCategory) {
  //     filtered = happenings.filter((hap) =>
  //       hap.category.toLowerCase().includes(selectedCategory.toLowerCase())
  //     );
  //   }

  //   // Now apply sorting (date/alphabetical) to the filtered list
  //   handleFilter(filtered);
  // };

  // const handleFilter = (filtered: HappeningType[]) => {
  //   let sorted = [...filtered];

  //   switch (value) {
  //     case "date_asc":
  //       sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  //       break;
  //     case "date_desc":
  //       sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //       break;
  //     case "alphabetical":
  //       sorted.sort((a, b) => a.title.localeCompare(b.title));
  //       break;
  //     default:
  //       break;
  //   }

  //   setFilteredHappenings(sorted);
  // };

  // // Effect to initially set filtered happenings
  // useEffect(() => {
  //   handleFilter(happenings); // Initially apply sorting to all happenings
  // }, [happenings]);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;
    setValue(filterValue);
    let filtered = [...happenings];
  
    if (filterValue === "date_asc") {
      const sorted = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setFilteredHappenings(sorted);
    } else if (filterValue === "date_desc") {
      const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFilteredHappenings(sorted);
    } else if (filterValue === "alphabetical") {
      const sorted = filtered.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredHappenings(sorted);
    } else {
      setFilteredHappenings(happenings); // Reset if no filter selected
    }
  };
  

  // Chat GPT
  // const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const filterValue = event.target.value;
  //   setValue(filterValue);

  //   let filtered = [...happenings];

  //   switch (filterValue) {
  //     case "date_asc": // Earliest to latest
  //       filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  //       break;

  //     case "date_desc": // Latest to earliest
  //       filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //       break;

  //     case "alphabetical": // Sort alphabetically by category
  //       filtered.sort((a, b) => a.title.localeCompare(b.title))
  //       break;

  //     default:
  //       // Reset to all happenings if filter is empty
  //       filtered = happenings;
  //       break;
  //   }

  //   setFilteredHappenings(filtered);
  // };



  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Finn nytt arrangement</h1>
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
              <option key={category} value={category}>{category}</option>
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

      <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
        {filteredHappenings && filteredHappenings.length > 0 ? (
          filteredHappenings.map((hap) => (
            <article
              className="rounded-lg border border-slate-400 px-6 py-8"
              key={hap.id}
              data-testid="course_wrapper"
            >
              <span className="block text-right capitalize">
                [{hap.category}]
              </span>
              <h3
                className="mb-2 text-base font-bold"
                data-testid="courses_title"
              >
                <Link href={`/Happenings/${hap.slug}`}>{hap.title}</Link>
              </h3>
              <p
                className="mb-6 text-base font-light"
                data-testid="courses_description"
              >
                {hap.description}
              </p>
              <Link
                className="font-semibold underline"
                data-testid="courses_url"
                href={`/Happenings/${hap.slug}`}
              >
                Mer info
              </Link>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen kurs</p>
        )}
      </section>
    </>
  )
}