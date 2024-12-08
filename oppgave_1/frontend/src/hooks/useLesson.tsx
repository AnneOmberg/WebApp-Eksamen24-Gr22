"use client";

import { useState, useEffect } from "react";
import { LessonType } from "@/components/types";
import useCourse from "./useCourse";

export default function useLesson() {
  const { courses } = useCourse();
  const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);

  useEffect(() => {
    if (courses.length > 0) {
      setIsCoursesLoaded(true);
    }
  }, [courses]);

  console.log("Course:", courses[0]);

  const getLesson = async (
    courseSlug: string,
    lessonSlug: string
  ): Promise<LessonType | undefined> => {
    if (!isCoursesLoaded) {
      console.error("Courses array is not loaded yet");
      return undefined;
    }

    console.log("Searching for course with slug:", courseSlug);

    // Log all course slugs to verify they are correct
    courses.forEach((course: any) => {
      console.log(`Course slug: ${course.slug}`);
    });

    // Find the course with the matching slug
    const course = courses.find((course: any) => course.slug === courseSlug);
    console.log("Found course:", course);
    if (!course) {
      console.error("Course not found");
      return undefined;
    }

    console.log("Course lessons:", course.lessons);

    // Find the lesson within the found course
    const lesson = course.lessons.find(
      (lesson: any) => lesson.slug === lessonSlug
    );
    console.log("Found lesson:", lesson, null, 2);
    return lesson;
  };

  return { getLesson, isCoursesLoaded };
}
