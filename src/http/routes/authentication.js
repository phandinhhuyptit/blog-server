import { Router } from "express";
import { authEndpoint } from "../endpoint/v1";
import { authSchema } from "../../validation";
import { validatorBody } from "../../utils/validator";
import authorized from "../../middleware/authorized";
import {  USER_ROLE_ENUM , TOKEN_ENUM } from "../../utils/constant"

const routes = Router();
const allRole = USER_ROLE_ENUM;
const allRoleValue = Object.keys(allRole).map(roleKey => allRole[roleKey]);
const { ACCESS_TOKEN ,REFRESH_TOKEN } = TOKEN_ENUM;

routes.post("/sign-up", validatorBody(authSchema.registerSchema), authEndpoint.signUpEndpoint);
routes.post("/sign-in", validatorBody(authSchema.loginSchema), authEndpoint.signInEndPoint);
routes.post("/refresh-token", authorized(REFRESH_TOKEN,allRoleValue),validatorBody(authSchema.refreshToken),authEndpoint.refreshTokenEndpoint)
routes.post("/log-out", authorized(REFRESH_TOKEN,allRoleValue),validatorBody(authSchema.logOutSchema),authEndpoint.logOutEndpoint)

// routes.get(
//   "/user/sign-in",

// );

export default routes;
