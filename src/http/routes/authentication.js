import { Router } from "express";
import { authEndpoint } from "../endpoint/v1";
import { authSchema } from "../../validation";
import { validatorBody } from "../../utils/validator";
import authorized from "../../middleware/ authorized";

const routes = Router();

routes.post("/sign-up", validatorBody(authSchema), authEndpoint.signUpEndpoint);

// routes.get(
//   "/user/sign-in",

// );

export default routes;
