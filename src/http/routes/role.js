import { Router } from "express";
import { roleEndpoint } from "../endpoint/v1";
import { roleSchema } from "../../validation";
import { validatorBody } from "../../utils/validator";
import authorized from "../../middleware/ authorized";

const routes = Router();

routes.post("/create-role", validatorBody(roleSchema.roleSchema), roleEndpoint.createRoleEndpoint);


// routes.get(
//   "/user/sign-in",

// );

export default routes;
