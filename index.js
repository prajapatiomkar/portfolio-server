import { configDotenv } from "dotenv";
configDotenv();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRouters from "./routes/userRoutes.js";
import passport from "passport";
import { initializePassport } from "./configs/passportConfig.js";
import session from "express-session";
import { connectDB } from "./configs/connectDB.js";
initializePassport(passport);
const app = express();

connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.get("/api", (req, res) => {
  res.send("hello from server!");
});

app.use("/api", userRouters);

// Global error handler - route handlers/middlewares which throw end up here
app.use((err, req, res, next) => {
  // response to user with 403 error and details
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
