import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";

const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// --------------------
// API Routes
// --------------------
registerRoutes(app);

// --------------------
// Frontend Static Serving
// --------------------

const frontendPath = path.join(__dirname, "../../../frontend/client/dist");

app.use(express.static(frontendPath));

app.get("/{*path}", (_req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --------------------
// Global Error Handler
// --------------------
app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

// --------------------
// Start Server
// --------------------
const PORT = parseInt(process.env.PORT || "5000", 10);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});