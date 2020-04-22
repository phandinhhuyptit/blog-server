import Joi from "joi";
import { STATUS_ROLE_ENUM } from "../utils/constant"

const allStatusRole = Object.keys(STATUS_ROLE_ENUM).map(statusKey =>  STATUS_ROLE_ENUM[statusKey])
const roleSchema = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string().valid(allStatusRole),
});

export default {
  roleSchema,
};
  