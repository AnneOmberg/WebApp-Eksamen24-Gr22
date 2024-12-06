// export type Id = ReturnType<typeof crypto.randomUUID>;

export type CourseType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  lessons: LessonType[];
  category: {
    id: string;
    name: string | undefined;
  };
};

export type LessonType = {
  id: string;
  title: string;
  slug: string;
  preAmble: string;
  texts: TextType[];
  comments: CommentType[];
};

export type TextType = {
  id: string;
  text: string;
};

export type CommentType = {
  id: string;
  createdBy: { id: string; name: string };
  comment: string;
};
