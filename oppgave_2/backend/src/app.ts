import { Hono } from "hono";
import { cors } from "hono/cors";
import { getHappeningData, updateHappeningData } from "./lib";
import { HappeningType } from "./types/type";
import { readFile } from "node:fs/promises";

const app = new Hono()
app.use(cors({origin: "*"}))

app.get("/categories", async (c) => {
  const data = await readFile("src/data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  return c.json(parsedData);
});

app.get("/happenings", async (c) => {
  const data = await getHappeningData()
  return c.json(data)
})

app.post("/happenings", async (c) => {
  const body = await c.req.json<HappeningType>()
  const data = await getHappeningData()
  data.push(body)
  await updateHappeningData(data)
  console.log(body);
  return c.json({body});
})

app.delete("/:id", async (c) => {
  const id = c.req.param("id")
  const data = await getHappeningData()
  const happeningExists = data.some((hap) => hap.id === id)
  if (!happeningExists) {
    return c.json({
      error: "Project not found",
      status: 404,
      success: false,
    });
  }
  const updatedHappening = data.filter((hap) => hap.id !== id)
  await updateHappeningData(updatedHappening)
  return c.json({ 
      success: true,
      updatedHappening 
    })
})

// app.delete("/:id", async (c) => {
//   const id = c.req.param("id")
//   const data = await getHappeningData()
//   const projectExists = data.some((project) => project.id === id)
//   if (!projectExists) {
//     return c.json({
//       error: "Project not found",
//       status: 404,
//       success: false,
//     });
//   }
//   const updatedProjects = data.filter((project) => project.id !== id)
//   await updateHappeningData(updatedProjects)
//   return c.json({ 
//       success: true,
//       updatedProjects 
//     })
// })

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
