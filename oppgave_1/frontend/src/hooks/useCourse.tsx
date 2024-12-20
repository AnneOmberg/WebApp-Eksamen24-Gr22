"use client";

import { CourseType } from "@/components/types";
import { useEffect, useState } from "react";

export default function useCourse() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [course, setCourse] = useState<CourseType | null>(null);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3999/api/categories", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log("Response", response);
  //     if (!response.ok) {
  //       console.error("Failed to fetch categories", response.statusText);
  //       return;
  //     }

  //     const data = await response.json();
  //     setCategories(data as string[]);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:3999/api/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const categories = await response.json();

      setCategories(categories);
      // You can now use the categories data in your frontend
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3999/api/courses");
      const data = await response.json();
      setCourses(data as CourseType[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  const getCourse = (slug: string): CourseType | null => {
    return courses.find((course) => course.slug === slug) ?? null;
  };

  // const createCourse = async (event: CourseType) => {
  //   try {
  //     const response = await fetch("http://localhost:3999/api/courses", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(event),
  //     });
  //     console.log("Status", response.status);
  //     console.log("OK", response.ok);

  //     const data = await response.json();
  //     console.log("Post", data);
  //     setCourses((prev: any) => [...prev, course]);
  //     fetchCourses();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createCourse = async (course: CourseType) => {
    try {
      console.log("Creating course with payload:", course);
  
      const response = await fetch("http://localhost:3999/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to create course: ${error.message}`);
        return;
      }
  
      const createdCourse = await response.json();
      console.log("Created course:", createdCourse);
  
      // Update local state
      setCourses((prev: CourseType[]) => [...prev, createdCourse.course]);
      fetchCourses(); // Refresh the list
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  

  const deleteCourse = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3999/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Delete", response.status);
      console.log("Delete OK", response.ok);

      const data = await response.json();
      setCourses(data.updatedCourses);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  return {
    categories,
    courses,
    setCourses,
    getCourse,
    createCourse,
    deleteCourse,
    capitalize,
  };
}
