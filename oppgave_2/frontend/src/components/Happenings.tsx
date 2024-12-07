"use client"

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";


export default function Happenings() {
    const { categories, happenings, setHappenings, deleteHappening } = useHappening()
    const [value, setValue] = useState<string>("");
    const [filteredHappenings, setFilteredHappenings] = useState<HappeningType[]>([]);

    useEffect(() => {
        console.log('Filtered Happenings after effect:', filteredHappenings); // Log filteredHappenings
        setFilteredHappenings(happenings);
      }, [happenings]);
      
      const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setValue(category);
      
        console.log('Handling filter, category:', category); // Log category
        if (category) {
          const filtered = happenings?.filter((hap) =>
            hap?.category?.toLowerCase()?.includes(category?.toLowerCase())
          );
          console.log('Filtered happenings:', filtered); // Log filtered array
          setFilteredHappenings(filtered);
        } else if (!category){
          setFilteredHappenings(happenings);
        }
      };
      
    return(
        <>
            <header className="mt-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Finn nytt arrangement</h1>
                <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
                    <span className="sr-only mb-1 block">Velg kategori:</span>
                    <select 
                    id="filter" 
                    name="filter" 
                    value={value} 
                    onChange={handleFilter} 
                    className="min-w-[200px] rounded bg-slate-200"
                    >
                        <option value="">Alle</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
            </header>

            <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
        {
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
                <Link href={`/kurs/${hap.slug}`}>{hap.title}</Link>
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
                href={`/kurs/${hap.slug}`}
              >
                Bestill her!
              </Link>
              <button className="flex px-2 py-px float-right bg-red-600 rounded-full" onClick={() => deleteHappening(hap.id)} type="button">X</button>
            </article>
          ))}
      </section>
        </>
    )
}