"use client";

import { CourseType } from "@/components/types";
import { useEffect, useState } from "react";

export default function useCourse() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [course, setCourse] = useState<CourseType | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3999/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch categories", response.statusText);
        return;
      }

      const data = await response.json();
      setCategories(data as string[]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3999/courses");
      const data = await response.json();
      setCourses(data as CourseType[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const getCourse = (slug: string): CourseType | null => {
    return courses.find((course) => course.slug === slug) ?? null;
  };

  return {
    categories,
    courses,
    setCourses,
    getCourse,
  };
}
