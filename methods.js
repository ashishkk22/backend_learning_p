const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.listen(3001);
app.use(cookieParser());
const userRouter = require("./foodApp/Routers/userRouter");
const authRouter = require("./foodApp/Routers/authRouter");
app.use("/user", userRouter);
app.use("/auth", authRouter);
