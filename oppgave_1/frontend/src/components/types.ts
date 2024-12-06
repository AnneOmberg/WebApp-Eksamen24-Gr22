// export type Id = ReturnType<typeof crypto.randomUUID>;

export type CourseType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  lessons: LessonType[];
  category: string;
};

export type LessonType = {
  id: string;
  title: string;
  slug: string;
  preAmble: string;
  text: TextType[];
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
