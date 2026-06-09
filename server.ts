import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { configureApp } from "./src/backend/app.js";

async function startServer() {
  const PORT = 3000;
  let vite;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
  }

  const app = configureApp(vite?.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();