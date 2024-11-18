"use client";

import { CourseType } from "@/components/types";
import { useCourse } from "@/hooks/useCourse";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { getCourse } = useCourse();
  const { courseSlug } = useParams() as { courseSlug: string };
  const [course, setCourse] = useState<CourseType | null>(null);

  useEffect(() => {
    const getContent = async () => {
      const data = await getCourse(courseSlug);
      console.log(data);
      setCourse(data);
    };
    getContent();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold">{course?.title}</h2>
      <p className="mt-4">{course?.description}</p>
    </section>
  );
}
