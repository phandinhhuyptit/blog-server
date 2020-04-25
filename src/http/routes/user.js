import { Router } from "express";
import { userEndPoint } from "../endpoint/v1";
import { validatorBody } from "../../utils/validator";
import { authSchema } from "../../validation";
import authorized from "../../middleware/authorized";
import { USER_ROLE_ENUM, TOKEN_ENUM } from "../../utils/constant";

const routes = Router();
const allRole = USER_ROLE_ENUM;
const allRoleValue = Object.keys(allRole).map((roleKey) => allRole[roleKey]);
const { ACCESS_TOKEN } = TOKEN_ENUM;
routes.get(
  "/me",
  authorized(ACCESS_TOKEN, allRoleValue),
  userEndPoint.getMeEndpoint
);
routes.put(
  "/me/change-password",
  authorized(ACCESS_TOKEN, allRoleValue),
  validatorBody(authSchema.changePasswordSchema),
  userEndPoint.changePasswordByMeEndPoint
);

export default routes;
