import { Hono } from "hono";
import { cors } from "hono/cors";
import { CourseType } from "./types/types";
import { readFile } from "fs/promises";
import { getCourseData, updateCourseData } from "./lib";

const app = new Hono();

app.use("/*", cors());

app.get("/courses", async (c) => {
  const data = await getCourseData()
  return c.json(data);
});

app.get("/categories", async (c) => {
  const data = await readFile("src/data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  return c.json(parsedData);
});

app.post("/courses", async (c) => {
  const body = await c.req.json<CourseType>()
  const data = await getCourseData();
  data.push(body)
  await updateCourseData(data)
  console.log(body);
  return c.json({body});
})

app.delete("/:id", async (c) => {
  const id = c.req.param("id")
  const data = await getCourseData()
  const courseExists = data.some((course) => course.id === id)
  if (!courseExists) {
    return c.json({
      error: "Project not found",
      status: 404,
      success: false,
    });
  }
  const updatedCoures = data.filter((course) => course.id !== id)
  await updateCourseData(updatedCoures)
  return c.json({ 
      success: true,
      updatedCoures 
    })
})

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
