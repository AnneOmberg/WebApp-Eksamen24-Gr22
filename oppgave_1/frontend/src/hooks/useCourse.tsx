"use client";

// import { courses } from "@/data/data";
import { useEffect, useState } from "react";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);

  const getCourse = async (slug: any) => {
    const data = await courses.courses.filter((course) => course.slug === slug);
    return data?.[0];
  };

  const fetchCourses = async () => {
    const response = await fetch("http://localhost:3999", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setCourses(JSON.parse(data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // const createCourse = async (data: any) => {
  //   await courses.push(data);
  // };

  return {
    courses,
    setCourses,
    getCourse,
    // createCourse,
  };
};
