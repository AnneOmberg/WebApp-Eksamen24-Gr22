import { promises as fs } from "fs";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", async (c) => {
  const data = await fs.readFile("src/data/data.json", "utf-8");
  return c.json(data);
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
