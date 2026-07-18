import { serve } from "@hono/node-server";
import { Hono } from "hono";
import 'dotenv/config';

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get("/ping", async(c) => {
    console.log("ping");
    setTimeout(() => {
        const res = fetch(`${process.env.VERCEL_URL}/`);
    }, Number(process.env.RENDER_DOWNTIME) || 1500);       // render downtime
    return c.json({ message: "pong" });
});

serve(
    {
        fetch: app.fetch,
        port: 3000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
