import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export function registerRoutes(app: Express) {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const inquiry = await storage.createContactInquiry(input);
      
      // Send email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "garvpandya3@gmail.com",
        subject: "New Demo Request from StudentVoice",
        text: `
New demo request received:

Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone || "Not provided"}
Google ID: ${input.googleId || "Not provided"}
Institution: ${input.institution}
        `.trim()
      };

      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ success: true });
    } catch (err) {
       if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      console.error("Error processing contact form:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
