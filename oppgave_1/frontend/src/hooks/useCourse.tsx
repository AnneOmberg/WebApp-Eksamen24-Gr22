"use client"

import { courses } from "@/data/data";

export const useCourse = () => {
    const getCourse = async (slug: any) => {
        const data = await courses.filter((course) => course.slug === slug);
        return data?.[0];
      };
      
      const createCourse = async (data: any) => {
        await courses.push(data);
      };
    
      return {
        getCourse, createCourse
      }
}