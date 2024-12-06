import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "fs/promises";

import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

app.use("/*", cors());

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
  } catch (err) {
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

app.get("/courses", async (c) => {
  const courses = await prisma.course.findMany();
  return c.json(courses);
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
