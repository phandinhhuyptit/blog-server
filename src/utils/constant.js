export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const STATUS_USER_ENUM = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
};

export const STATUS_ROLE_ENUM = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
};

export const TOKEN_ENUM = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

export const USER_ROLE_ENUM = {
  MANAGER: "manager",
  ADMIN: "admin",
  USER: "user",
};

export const SEX_ENUM = {
  MALE: "Male",
  FEMALE: "Female",
};

export const SCHEDULE = {
  EXPIRED_TOKEN: {
    hours: 0,
    minute: 0,
    second: 0,
  },
};

export const EVENT_SOCKET = {
  CONNECT: "connect",
  ERROR: "error",
  DISCONNECT: "disconnect",
  SEND_MESSAGE: "sendMessage",
  NUMBER_ONLINE: "numberOnline",
  CREATE_COMMENT: "createComment",
  CREATE_POST: "createPost",
};
