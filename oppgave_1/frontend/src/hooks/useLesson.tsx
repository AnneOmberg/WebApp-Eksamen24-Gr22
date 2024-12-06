"use client";

import { LessonType } from "@/components/types";
import { courses } from "@/data/data";

export default function useLesson() {
  const getLesson = async (
    courseSlug: string,
    lessonSlug: string
  ): Promise<LessonType | undefined> => {
    const data = await courses
      .flatMap(
        (course: any) =>
          course.slug === courseSlug &&
          course.lessons.filter((lesson: any) => lesson.slug === lessonSlug)
      )
      .filter(Boolean);
      console.log("Lessons:", data)
    return data?.[0]; // It might return undefined if no lesson is found
  };

  return { getLesson };
}
