import SocketIO from "socket.io";
import jwt from "jsonwebtoken";
import loGet from "lodash/get";
import User from "../models/user"
import logger from "../utils/logger";
import configs from "../configs/config";
import ServerError from "../utils/serverError";
import { remove as loRemove } from "lodash";
import { EVENT_SOCKET } from "../utils/constant";

const NUMBER_FAKE = 2;

class _SocketService {
  constructor() {
    this.io = null;
    this.connections = {};
    this.countConnects = 0;

    this.onConnection = this.onConnection.bind(this);
  }

  start(server) {
    this.io = new SocketIO(server);

    // middleware
    this.io.use(async (socket, next) => {
      try {
        const authorization = socket.handshake.query.accessToken;
        if (!authorization) throw new ServerError("Missing token", 401);

        const token = authorization.split(" ")[1];
        const payload = await new Promise((resolve, reject) =>
          jwt.verify(token, configs.JWT_SECRET_TOKEN, function (err, payload) {
            if (err) return reject(err);
            resolve(payload);
          })
        );

        socket.user = payload.user;
        if (!socket.user)
          throw new ServerError("Please login to continue", 401);

        return next();
      } catch (error) {
        next(error);
      }
    });
    this.io.on("connection", this.onConnection);
  }

  close() {
    this.io && this.io.close();
  }

  async onConnection(socket) {
    if (!this.connections) this.connections = {};

    const userId = socket.user._id;

    if (this.connections[userId]) {
      const socketIds = loGet(this.connections[userId], ["socketIds"], []);
      if (socketIds.indexOf(socket.id) < 0) {
        socketIds.push(socket.id);
      }
      this.connections[userId].socketIds = socketIds;
    } else {
      this.connections[userId] = {
        socketIds: [socket.id],
      };
      this.countConnects = this.countConnects + 1;
    }
    await User.findByIdAndUpdate(userId, { onlineAt: new Date() });

    this.io.emit(EVENT_SOCKET.NUMBER_ONLINE, {
      numberOnline: this.countConnects + NUMBER_FAKE,
      online: userId,
    });

    socket.on(EVENT_SOCKET.DISCONNECT, async (reason) => {
      loRemove(
        this.connections[userId].socketIds,
        (item) => item === socket.id
      );
      // If array socketIds empty loRemove user from array connections of user
      if (this.connections[userId].socketIds.length === 0) {
        delete this.connections[userId];
        this.countConnects = this.countConnects - 1;
      }

      await User.findByIdAndUpdate(userId, { offlineAt: new Date() });

      this.io.emit(EVENT_SOCKET.NUMBER_ONLINE, {
        numberOnline: this.countConnects + NUMBER_FAKE,
        offline: userId,
      });

      logger.warning(reason);
    });

    socket.on(EVENT_SOCKET.ERROR, (error) => {
      logger.error(error);
    });
  }

  getIO() {
    return this.io;
  }

  getConnections() {
    return this.connections;
  }

  getCountConnections() {
    return this.countConnects + NUMBER_FAKE;
  }
}

const SocketService = new _SocketService();

export default SocketService;
