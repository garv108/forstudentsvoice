import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Register API routes
registerRoutes(app);

// Global error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = parseInt(process.env.PORT || "5000", 10);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});