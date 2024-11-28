"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Lesson from "@/components/Lesson";
import useCourse from "@/hooks/useCourse";
import { CourseType } from "@/components/types";

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

  return (
    <>
      {lessonSlug ? (
        <Lesson lessonSlug={lessonSlug} courseSlug={courseSlug} />
      ) : (
        <section>
          <h2 className="text-2xl font-bold">{content?.title}</h2>
          <p className="mt-4">{content?.description}</p>
        </section>
      )}
    </>
  );
}
