"use client";

import { useState, useEffect } from "react";
// import { comments } from "../data/comments";

import { useParams, useRouter } from "next/navigation";
import { comments } from "@/data/data";

export default function Comment() {
    const getComments = async (lessonSlug) => {
        const data = await comments.filter(
            (comment) => comment.lesson.slug === lessonSlug
        );
        return data;
    };

    const createComment = async (data) => {
        await comments.push(data);
    };
}