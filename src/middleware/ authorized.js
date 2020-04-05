// import authenticator from "./../libs/authenticator";
// import userService from "./../services/user";
// import managerService from "../services/manager";
// import config from "../config";
// import loGet from "lodash/get";
// import { TOKEN_ENUM, USER_ROLE_ENUM } from "../libs/constant";

// const { ACCESS_TOKEN, REFRESH_TOKEN } = TOKEN_ENUM;
// const allRole = USER_ROLE_ENUM;

// const authorized = (type, roles) => {
//   return async (req, res, next) => {
//     const tokenBearer = await req.headers["authorization"];
//     if (!tokenBearer) {
//       return res.unauthorized("Must have token to access");
//     }
//     if (!tokenBearer.startsWith("Bearer ")) {
//       return res.unauthorized("Auth token invalid");
//     }
//     const token = tokenBearer.slice(7, tokenBearer.length);
//     try {
//       let userId;
//       if (type === ACCESS_TOKEN) {
//         userId = await authenticator.verifyAccessToken(token);
//       }
//       if (type === REFRESH_TOKEN)
//         userId = await authenticator.verifyRefreshToken(token);
//       let user = await userService.findById(userId);
//       if (!user) user = await managerService.findById(userId);
//       else user.role = allRole.USER;
//       req.credentials = { user, token };
//       if (!user) return res.internalServerError("Require authentication");
//       if (!roles.includes(user.role))
//         return res.unauthorized(`Role ${user.role} is not allowed`);
//       return next();
//     } catch (error) {
//       return res.unauthorized(error.message);
//     }
//   };
// };

// export default authorized;
