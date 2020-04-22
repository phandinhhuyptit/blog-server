import { Router } from "express";
import { roleEndpoint } from "../endpoint/v1";
import { roleSchema } from "../../validation";
import { validatorBody } from "../../utils/validator";
import authorized from "../../middleware/authorized";
import {  USER_ROLE_ENUM , TOKEN_ENUM } from "../../utils/constant"

const routes = Router();
const allRole = USER_ROLE_ENUM;
const cmsRoleValue = Object.keys(allRole)
  .filter(roleKey => allRole[roleKey] !== "user")
  .map( roleKey =>  allRole[roleKey] )
const allRoleValue = Object.keys(allRole).map(roleKey => allRole[roleKey]);
const { ACCESS_TOKEN } = TOKEN_ENUM;
routes.post("/create-role",authorized(TOKEN_ENUM.ACCESS_TOKEN,cmsRoleValue),validatorBody(roleSchema.roleSchema),roleEndpoint.createRoleEndpoint);

export default routes;
