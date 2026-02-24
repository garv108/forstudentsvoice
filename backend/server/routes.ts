import type { Express } from "express";

export function registerRoutes(app: Express) {
  app.post("/api/contact", async (req, res) => {
    console.log("Demo request received:", req.body);
    res.status(200).json({ success: true });
  });
}