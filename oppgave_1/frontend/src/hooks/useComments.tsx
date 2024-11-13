"use client";

import { comments } from "@/data/data";

export default function useComments() {
  const getComments = async (lessonSlug: string) => {
    const data = await comments.filter(
      (comment) => comment.lesson.slug === lessonSlug
    );
    return data;
  };

  const createComment = async (data: any) => {
    await comments.push(data);
  };

  return { getComments, createComment };
}
