"use client";

import { useCourse } from "@/hooks/useCourse";
import { useEffect, useState } from "react";

export default function Courses() {
  interface Course {
    id: string;
    category: string;
    slug: string;
    title: string;
    description: string;
  }

  const [value, setValue] = useState("");

  const { courses, setCourses } = useCourse();

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(null);
  console.log(filteredCourses);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFilteredCourses(courses.courses);
    setCategories(courses.categories);
  }, [courses]);

  // useEffect(() => {
  //   const getAllCourses = async () => {
  //     try {
  //       const data = await fetchCourse();
  //       setAllCourses(data.courses);
  //       setFilteredCourses(data.courses);
  //       setCategories(data.categories);
  //     } catch (error) {
  //       console.error("Feil ved henting av kurs:", error);
  //     }
  //   };
  //   getAllCourses();
  // }, []);

  if (!filteredCourses) {
    return <div>Loading...</div>;
  }

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);

    if (category) {
      const filtered = courses.courses.filter((course) =>
        course.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else if (!category) {
      console.log("category", category);
      setFilteredCourses(courses.courses);
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
                [{course.category}]
              </span>
              <h3
                className="mb-2 text-base font-bold"
                data-testid="courses_title"
              >
                <a href={`/kurs/${course.slug}`}>{course.title}</a>
              </h3>
              <p
                className="mb-6 text-base font-light"
                data-testid="courses_description"
              >
                {course.description}
              </p>
              <a
                className="font-semibold underline"
                data-testid="courses_url"
                href={`/kurs/${course.slug}`}
              >
                Til kurs
              </a>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen kurs</p>
        )}
      </section>
    </>
  );
}
