import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";

const app = new Hono();

app.get("/", async (c) => {
    const urls = JSON.parse(process.env.RENDER_URLS ?? "[]") as string[];

    const res = await Promise.all(urls.map((url) => fetch(url)));
    
    const data = await Promise.all(res.map((response) => response.json()));

    console.log(data);
    return c.json(data);
});

serve(
    {
        fetch: app.fetch,
        port: 4000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
