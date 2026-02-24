import type { Express, Request, Response } from "express";
import { db } from "./db";
import { contactInquiries } from "../shared/schema";
import { insertContactInquirySchema } from "../shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const parsed = insertContactInquirySchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: parsed.error.flatten() 
        });
      }

      const [saved] = await db
        .insert(contactInquiries)
        .values(parsed.data)
        .returning();

      console.log("Demo request saved:", saved);
      return res.status(200).json({ success: true, id: saved.id });

    } catch (error) {
      console.error("Failed to save contact inquiry:", error);
      return res.status(500).json({ success: false, message: "Failed to save request" });
    }
  });
}