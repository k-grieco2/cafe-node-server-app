import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from './Users/routes.js';
import session from "express-session";
import "dotenv/config";
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/cafe';
mongoose.connect(CONNECTION_STRING);
const app = express();
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
}  
app.use(session(sessionOptions));
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
UserRoutes(app);
app.listen(process.env.PORT || 4000);