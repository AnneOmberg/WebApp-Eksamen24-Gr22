"use client";

import useCourse from "@/hooks/useCourse";
import { useEffect, useState } from "react";
import { CourseType } from "./types";
import Link from "next/link";

export default function Courses() {
  const [value, setValue] = useState<string>("");

  const { categories, courses, deleteCourse } = useCourse();

  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  // if (!filteredCourses) {
  //   return <div>Loading...</div>;
  // }

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);

    if (category) {
      const filtered = courses.filter((course) =>
        course?.category?.name.toLowerCase()?.includes(category?.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else if (!category) {
      setFilteredCourses(courses);
    }
  };

  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h2 className="mb-6 text-xl font-bold" data-testid="title">
          Alle kurs
        </h2>
        <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
          <span className="sr-only mb-1 block">Velg kategori:</span>
          <select
            id="filter"
            name="filter"
            data-testid="filter"
            value={value}
            onChange={handleFilter}
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
      </header>

      <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <article
              className="rounded-lg border border-slate-400 px-6 py-8"
              key={course.id}
              data-testid="course_wrapper"
            >
              <span className="block text-right capitalize">
                [{course.category.name}]
              </span>
              <h3
                className="mb-2 text-base font-bold"
                data-testid="courses_title"
              >
                <Link href={`/kurs/${course.slug}`}>{course.title}</Link>
              </h3>
              <p
                className="mb-6 text-base font-light"
                data-testid="courses_description"
              >
                {course.description}
              </p>
              <Link
                className="font-semibold underline"
                data-testid="courses_url"
                href={`/kurs/${course.slug}`}
              >
                Til kurs
              </Link>
              <button
                className="flex px-2 py-px float-right bg-red-600 rounded-full"
                onClick={() => deleteCourse(course.id)}
                type="button"
              >
                X
              </button>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen kurs</p>
        )}
      </section>
    </>
  );
}
