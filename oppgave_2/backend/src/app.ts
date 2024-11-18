import { Hono } from "hono";
import { cors } from "hono/cors";
import { getHappeningData, updateHappeningData } from "./lib";
// import { HappeningType } from "./types/type";

const app = new Hono()
app.use(cors({origin: "*"}))

app.get("/bestillinger", async (c) => {
    const data = await getHappeningData()
    return c.json({data})
})

// app.post("/", async (c) => {
//     const body = await c.req.json<HappeningType>()
//     const data = await getHappeningData()
//     data.push(body)
//     await updateHappeningData(data)
//     console.log(body);
//     return c.json({body});
// })

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
