import express, { NextFunction, Request, Response } from "express";
export const app = express();
require('dotenv').config();
import cors from "cors"; 
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import { rateLimit } from 'express-rate-limit'


//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

// Debug middleware to log cookies
app.use((req, res, next) => {
  console.log("🍪 Cookies received:", req.cookies);
  console.log("🌐 Origin:", req.headers.origin);
  next();
});

//cors => cors origin resorse sharing
const origin = process.env.ORIGIN || "https://lms-rosy-omega.vercel.app"
console.log("🚀 ~ origin:", origin)
app.use(
    cors({
        origin: origin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh-token'],
        exposedHeaders: ['x-refresh-token'],
        optionsSuccessStatus: 200
    })
);



// api request limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56,
	
})


// Routes
app.use('/api/v1/', userRouter);
app.use('/api/v1/', courseRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', notificationRouter);
app.use('/api/v1/', analyticsRouter);
app.use('/api/v1/', layoutRouter);



//TESTING API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        success: true,
        message: "API is working"
    })
});

// app.all("", (req: Request, res: Response, next: NextFunction) => {
//     const err = new Error(`Route ${req.originalUrl} not found `) as any; 
//     err.statusCode = 404;
//     next(err);
// });

//miiddleware calls
app.use(limiter)

app.use(ErrorMiddleware);

