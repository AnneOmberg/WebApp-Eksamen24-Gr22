"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Lesson from "@/components/Lesson";
import useCourse from "@/hooks/useCourse";
import { users } from "@/data/data";
import { CourseType } from "@/components/types";
import Link from "next/link";

export default function Course() {
  const { courses, getCourse } = useCourse();
  const [content, setContent] = useState<CourseType | null>(null);

  const { courseSlug, lessonSlug } = useParams() as {
    courseSlug: string;
    lessonSlug: string;
  };

  useEffect(() => {
    const getContent = async () => {
      if (courseSlug && courses.length > 0) {
        const data = await getCourse(courseSlug);
        setContent(data as CourseType);
      }
    };
    getContent();
  }, [courseSlug, courses]);

  if (!courses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      {/* Sidebar for leksjoner */}
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content?.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`text-sm mb-4 w-full rounded-lg border px-4 py-2 ${
                lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
              } hover:bg-emerald-100 focus:bg-emerald-200`}
            >
              <Link
                href={`/kurs/${courseSlug}/${lesson.slug}`}
                className="block focus:outline-none"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Vis leksjon eller kursoversikt */}
      {lessonSlug ? (
        <Lesson lessonSlug={lessonSlug} courseSlug={courseSlug} />
      ) : (
        <section>
          <h2 className="text-2xl font-bold">{content?.title}</h2>
          <p className="mt-4">{content?.description}</p>
        </section>
      )}

      {/* Liste over deltakere */}
      <aside className="border-l border-slate-200 pl-6">
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
