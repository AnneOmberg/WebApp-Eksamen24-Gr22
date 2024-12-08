import { Hono } from "hono";
import { cors } from "hono/cors";
import { getHappeningData, updateHappeningData } from "./lib";
import { HappeningType } from "./types/type";
import { PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";

const app = new Hono();
const prisma = new PrismaClient();

app.use(cors({ origin: "*" }));

app.get("/api/all", async (c) => {
  const venues = await prisma.venue.findMany();
  const users = await prisma.user.findMany();
  const events = await prisma.event.findMany();
  return c.json({ venues, users, events });
});

app.get("/api/templates", async (c) => {
  const templates = await prisma.template.findMany();
  const parsedTemplates = templates.map((template) => ({
    ...template,
    allowedWeekdays: template.allowedWeekdays
      ? JSON.parse(template.allowedWeekdays)
      : [],
  }));
  return c.json({ templates: parsedTemplates });
});

app.post("/api/templates", async (c) => {
  const body = await c.req.json();
  const template = await prisma.template.create({
    data: {
      ...body,
      allowedWeekdays: JSON.stringify(body.allowedWeekdays),
    },
  });
  console.log(template);
  return c.json({ template });
});

app.delete("/api/templates/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const template = await prisma.template.delete({
    where: {
      id: id,
    },
  });
  return c.json({ template });
});

app.get("/api/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json({ users });
});

app.get("/api/events", async (c) => {
  const events = await prisma.event.findMany({
    include: {
      venue: true,
      template: true,
    },
  });
  return c.json({ events });
});

app.get("/api/venues", async (c) => {
  try {
    const venues = await prisma.venue.findMany();
    return c.json({ venues });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (c) => {
  const data = await getHappeningData();
  return c.json({ data });
});

app.post("/", async (c) => {
  const body = await c.req.json<HappeningType>();
  const data = await getHappeningData();
  data.push(body);
  await updateHappeningData(data);
  console.log(body);
  return c.json({ body });
});
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
