import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile } from "fs/promises";
import { getCourseData, updateCourseData } from "./lib";
import { CourseType } from "./types/types";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

app.use("/*", cors());

app.get("/api/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

app.get("/api/categories", async (c) => {
  const categories = await prisma.category.findMany();
  return c.json(categories);
});

app.post("/api/categories", async (c) => {
  const body = await c.req.json();
  try {
    await prisma.category.create({
      data: {
        name: body.name,
      },
    });
    return c.json({ message: "Category created" });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

app.delete("/api/categories/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await prisma.category.delete({
      where: { id: id },
    });
    return c.json({ message: "Category deleted" });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/api/courses", async (c) => {
  const body = await c.req.json<CourseType>();
  try {
    await prisma.course.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        categoryId: body.category,
        lessons: {
          create: body.lessons.map((lesson) => ({
            title: lesson.title,
            slug: lesson.slug,
            preAmble: lesson.preAmble,
            texts: {
              create: lesson.text.map((text) => ({
                text: text.text,
              })),
            },
          })),
        },
      },
    });
    return c.json({ message: "Course created" });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

app.get("/api/courses", async (c) => {
  console.log("Fetching courses...");
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: {
          include: {
            texts: true,
            comments: {
              include: {
                createdBy: true,
              },
            },
          },
        },
        category: true,
      },
    });
    console.log("Courses fetched:", JSON.stringify(courses, null, 2));
    return c.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    return c.json({ error: "Failed to fetch courses" }, 500);
  }
});

app.delete("/api/courses/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          lesson: {
            courseId: id,
          },
        },
      }),

      prisma.text.deleteMany({
        where: {
          lesson: {
            courseId: id,
          },
        },
      }),

      prisma.lesson.deleteMany({
        where: { courseId: id },
      }),

      prisma.course.delete({
        where: { id: id },
      }),
    ]);
    return c.json({
      message: "Course and related lessons, texts, and comments deleted",
    });
  } catch (err: any) {
    console.error("Error deleting course:", err);
    return c.json({ error: "Failed to delete course" }, 500);
  }
});

app.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

app.get("/categories", async (c) => {
  const data = await readFile("src/data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  return c.json(parsedData);
});

app.post("/courses", async (c) => {
  const body = await c.req.json<CourseType>();
  const data = await getCourseData();
  data.push(body);
  await updateCourseData(data);
  console.log(body);
  return c.json({ body });
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await getCourseData();
  const courseExists = data.some((course) => course.id === id);
  if (!courseExists) {
    return c.json({
      error: "Project not found",
      status: 404,
      success: false,
    });
  }
  const updatedCoures = data.filter((course) => course.id !== id);
  await updateCourseData(updatedCoures);
  return c.json({
    success: true,
    updatedCoures,
  });
});

app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    500
  );
});

export default app;
