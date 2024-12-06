"use client";

import { useParams } from "next/navigation";
import Lesson from "@/components/Lesson";

export default function LessonPage() {
  const { courseSlug, lessonSlug } = useParams() as {
    courseSlug: string;
    lessonSlug: string;
  };

  return <Lesson lessonSlug={lessonSlug} courseSlug={courseSlug} />;
}
