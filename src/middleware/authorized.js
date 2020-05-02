import authenticator from "../utils/authenticator/index";
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
        const user = await authenticator.verifyAccessToken(token)
        userId = loGet(user,["_id"],"") 
        req.credentials = { token };
      }
      if (type === REFRESH_TOKEN) {
        const { refreshToken } = req.body
        const user = await authenticator.verifyRefreshToken(refreshToken);
        userId = loGet(user,["_id"],"") 
        req.credentials = { token , refreshToken };
      }
      const user = await User.findById(userId).select("-password").populate("role")
      const role = loGet(user,["role","name"],"")
      Object.assign(req.credentials,{user})
      if (!user) throw new ServerError("Require authentication");
      if (!roles.includes(role))
        throw new ServerError(`Role ${role} is not allowed`, 401);
      return next();
    } catch (error) {
      logger.error(error);
      res.status(error.status || 500).json({ message: error.message });
    }
    return next()
  };
};

export default authorized;
