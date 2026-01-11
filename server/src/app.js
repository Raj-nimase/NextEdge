import express from "express";
import eventRoutes from "./events/event.routes.js";
import adminRoutes from "./Admin/admin.routes.js";
import contactRoutes from "./contacts/contact.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
