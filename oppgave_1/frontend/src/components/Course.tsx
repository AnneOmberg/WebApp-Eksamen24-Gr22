"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lesson from "@/components/Lesson";
import { useCourse } from "@/hooks/useCourse";
import { users } from "@/data/data";
import { CourseType } from "@/components/types";

export default function Course() {
  const [content, setContent] = useState<CourseType | null>(null);
  const { getCourse } = useCourse();

  const { slug, id } = useParams() as { slug: string; id: string };
  const lessonSlug = slug as string;
  const courseSlug = id as string;

  useEffect(() => {
    const getContent = async () => {
      const data = await getCourse(courseSlug);
      setContent(data as CourseType);
    };
    getContent();
  }, [courseSlug]);

  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content?.lessons?.map((lesson) => (
            <li
              className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
              }`}
              key={lesson.id}
            >
              <a
                data-testid="lesson_url"
                data-slug={lessonSlug}
                className="block h-full w-full"
                href={`/kurs/${content?.slug}/${lesson.slug}`}
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      {lessonSlug ? (
        <article>
          <Lesson lessonSlug={lessonSlug} courseSlug={courseSlug} />
        </article>
      ) : (
        <section>
          <>
            <h2 className="text-2xl font-bold" data-testid="course_title">
              {content?.title}
            </h2>
            <p
              className="mt-4 font-semibold leading-relaxed"
              data-testid="course_description"
            >
              {content?.description}
            </p>
          </>
        </section>
      )}
      <aside
        data-testid="enrollments"
        className="border-l border-slate-200 pl-6"
      >
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users?.map((user) => (
            <li className="mb-1" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
