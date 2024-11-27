import { promises as fs } from "fs";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/courses", async (c) => {
  const data = await fs.readFile("src/data/courses.json", "utf-8");
  const parsedData = JSON.parse(data);
  return c.json(parsedData);
});

app.get("/categories", async (c) => {
  const data = await fs.readFile("src/data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  return c.json(parsedData);
});

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
