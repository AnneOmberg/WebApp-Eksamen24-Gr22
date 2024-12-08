"use client";

import { useEffect, useState } from "react";
import useCourse from "@/hooks/useCourse";
import useComments from "@/hooks/useComments";
import useLesson from "@/hooks/useLesson";
import { CommentType, CourseType, LessonType } from "@/components/types";

type LessonProps = {
  lessonSlug: string;
  courseSlug: string;
};

export default function Lesson({ lessonSlug, courseSlug }: LessonProps) {
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  const { getLesson, isCoursesLoaded } = useLesson();
  const { getCourse } = useCourse();
  const { getComments } = useComments();

  useEffect(() => {
    const fetchData = async () => {
      if (lessonSlug && courseSlug) {
        const lessonData = await getLesson(courseSlug, lessonSlug);
        console.log("LESSON.TSX", lessonData);
        const courseData = await getCourse(courseSlug);
        const commentsData = await getComments(lessonSlug);

        if (lessonData) {
          setLesson(lessonData);
        }

        setComments(commentsData);
      }
    };
    fetchData();
  }, [lessonSlug, courseSlug, isCoursesLoaded]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{lesson?.title}</h2>
      <p className="mt-4">{lesson?.preAmble}</p>
      {lesson?.texts?.map((paragraph) => (
        <p key={paragraph?.id} className="mt-4">
          {paragraph?.text}
        </p>
      ))}
      <section className="flex flex-col gap-4">
        <h4 className="font-bold">Kommentarer ({comments?.length})</h4>
        <ul className="flex flex-col gap-5">
          {lesson?.comments?.map((comment: CommentType) => (
            <li key={comment?.id} className="bg-slate-200 p-3">
              <strong>{comment?.createdBy.name}</strong>: {comment?.comment}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
