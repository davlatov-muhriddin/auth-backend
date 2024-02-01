import express from "express";
import mongoose from "mongoose";
import dotEnv from "dotenv";
import cors from "cors";
import registerRouter from "./routes/users.js";

const app = express();
dotEnv.config();
app.use(express.json());

app.use(
  cors({
    origin: "https://auth-frontend-flame.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/register", registerRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to database"));

app.listen(5000, () => {
  console.log("server is running");
});
