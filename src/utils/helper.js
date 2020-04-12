import SocketService from "../services/socketService";
import { get } from "lodash";

export async function eventSocketUser(connectionUsers, name, data) {
  // Get socket service
  const io = SocketService.getIO();
  for (let i = 0; i < connectionUsers.length; i++) {
    const socketIds = get(connectionUsers, [i, "socketIds"], []);
    if (socketIds && socketIds.length > 0) {
      socketIds.forEach((socketId) => {
        io.to(socketId).emit(name, data);
      });
    }
  }
}

export async function eventAllUser(name, data) {
  // Get socket service
  const io = SocketService.getIO();
  io.emit(name, data);
}
