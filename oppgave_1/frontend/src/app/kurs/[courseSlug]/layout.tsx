"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCourse from "@/hooks/useCourse";
import { users } from "@/data/data";
import { CourseType } from "@/components/types";
import Link from "next/link";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<CourseType | null>(null);
  const { getCourse, courses } = useCourse();

  // Hent dynamiske parametere fra URL
  const { courseSlug, lessonSlug } = useParams() as {
    courseSlug: string;
    lessonSlug: string;
  };

  useEffect(() => {
    const getContent = async () => {
      if (courseSlug) {
        const data = await getCourse(courseSlug);
        setContent(data as CourseType);
      }
    };
    getContent();
  }, [courseSlug, courses]);

  useEffect(() => {}, [content]);

  // Sjekk at kurset ble lastet
  if (!content) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      {/* Sidebar for leksjoner */}
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content?.lessons && content?.lessons?.length > 0 ? (
            content?.lessons?.map((lesson) => (
              <li
                key={lesson?.id}
                className={`text-sm mb-4 w-full rounded-lg border px-4 py-2 ${
                  lessonSlug === lesson?.slug
                    ? "bg-emerald-300"
                    : "bg-transparent"
                }`}
              >
                <Link
                  href={`/kurs/${courseSlug}/${lesson?.slug}`}
                  className="block"
                >
                  {lesson?.title}
                </Link>
              </li>
            ))
          ) : (
            <p>No lessons available</p>
          )}
        </ul>
      </aside>

      {/* Hovedinnhold (children vil være leksjonen eller oversikten) */}
      <div>{children}</div>

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
