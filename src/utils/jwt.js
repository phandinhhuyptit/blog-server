import jwt from "jsonwebtoken";
import moment from "moment";
import configs from "../config";

export const createToken = (user, exp) =>
  `JWT ${jwt.sign(
    { user, exp: exp || moment().add(6, "month").unix() },
    configs.JWT_SECRET_TOKEN
  )}`;
