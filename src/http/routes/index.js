import express from "express";

import authRouter from "./authentication";
import roleRouter from "./role"
import userRouter from "./user"

const router = express.Router();

router.get("/", (req, res) => res.status(200).json("API"));
router.use("/auth", authRouter);
router.use("/role", roleRouter);
router.use("/user", userRouter);


router.use((err, req, res, next) => {
  if (err.name !== "HttpError" || !err.errorCode) return next(err);
  res.status(err.errorCode).json({ message: err.message });
});

export default router;
