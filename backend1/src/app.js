import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
}
app.use(
  cors(corsOptions)
);

app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({
    extended: true, 
    limit: "20mb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.js";
import eventRouter from "./routes/event.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", eventRouter);

export { app };
