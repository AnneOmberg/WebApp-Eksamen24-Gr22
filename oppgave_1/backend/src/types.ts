export type CourseType = {
    id: string;
    title: string;
    slug: string;
    description: string;
    lessons: {
        id: string;
        title: string;
        slug: string;
        preAmble: string;
        text: {
            id: string;
            text: string;
        }[];
    }[];
    category: string;
}