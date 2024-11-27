"use client";

import { CourseType } from "@/components/types";
import { useEffect, useState } from "react";

export default function useCourse() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [coursesFetched, setCoursesFetched] = useState(false); // Add this line to define the state variable

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
      const response = await fetch("http://localhost:3999/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch courses", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Fetched courses:", data);
      setCourses(data as CourseType[]);
      setCoursesFetched(true); // Update the state variable
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const getCourse = async (slug: string): Promise<CourseType | null> => {
    if (!coursesFetched) {
      console.log("Courses not fetched yet");
      return null;
    }

    console.log("Searching for course with slug:", slug);
    console.log("Current courses:", courses);

    const course = courses.find((course) => course.slug === slug);
    if (course) {
      console.log("Course found:", course);
      return course;
    }

    console.log("No course found with slug:", slug);
    return null;
  };

  return {
    categories,
    courses,
    setCourses,
    getCourse,
    coursesFetched,
  };
}
