import authenticator from "../utils/authenticator";
import User from "../models/user";
import loGet from "lodash/get";
import logger from "../utils/logger";
import ServerError from "../utils/serverError";
import { TOKEN_ENUM, USER_ROLE_ENUM } from "../utils/constant";

const { ACCESS_TOKEN, REFRESH_TOKEN } = TOKEN_ENUM;

const authorized = (type, roles) => {
  return async (req, res, next) => {
    const tokenBearer = await req.headers["authorization"];
    if (!tokenBearer) {
      throw new ServerError("Must have token to access", 401);
    }
    if (!tokenBearer.startsWith("Bearer ")) {
      throw new ServerError("Auth token invalid", 401);
    }
    const token = tokenBearer.slice(7, tokenBearer.length);
    try {
      let userId;
      if (type === ACCESS_TOKEN) {
        userId = await authenticator.verifyAccessToken(token);
      }
      if (type === REFRESH_TOKEN) {
        userId = await authenticator.verifyRefreshToken(token);
      }
      const user = await User.findById(userId);
      req.credentials = { user, token };
      if (!user) throw new ServerError("Require authentication");
      if (!roles.includes(user.role))
        throw new ServerError(`Role ${user.role} is not allowed`, 401);
      return next();
    } catch (error) {
      logger.error(error);
      res.status(error.status || 500).json({ message: error.message });
    }
  };
};

export default authorized;
