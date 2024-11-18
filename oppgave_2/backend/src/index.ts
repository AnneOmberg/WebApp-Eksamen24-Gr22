import app from "./app";
// import { port } from "./config";

import { serve } from "@hono/node-server";

const port = 3999
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
