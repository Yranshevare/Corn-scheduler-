import { serve } from "@hono/node-server";
import { Hono } from "hono";
import 'dotenv/config';

const app = new Hono();

app.get("/", async (c) => {
    const res = await fetch(`${process.env.RENDER_URL}/ping`);
    console.log(await res.json());
    return c.text("Hello Hono!");
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
