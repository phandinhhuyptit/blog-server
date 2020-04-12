import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import http from "http";

import logger from "./utils/logger";
import configs from "./configs/config";
// import SocketService from './services/socketService'

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  const cors = process.env.CORS.split(",");
  if (cors.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization, x-access-token"
  );
  res.setHeader("Content-Type", "application/json");
  next();
});

// remind take medicine
// redmindTakeMedicines()

// parser Content-Type: application/json
app.use(bodyParser.json());

// parse Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./http/routes").default);

// Connect MongoDB
mongoose.connect(configs.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("open", () => {
  logger.info("DB connected");
});

db.on("error", (err) => logger.error(err));

const server = http.Server(app);
// SocketService.start(server)

server.listen(configs.PORT, () =>
  logger.info(`- Ready on port ${configs.PORT}`)
);

// keep server running
process.on("uncaughtException", (err) =>
  logger.error("uncaughtException: " + err)
);
process.on("unhandledRejection", (err) =>
  logger.error("unhandledRejection: " + err)
);
