import Joi from "joi";
import { SEX_ENUM } from "../utils/constant";

const allSexValue = Object.keys(SEX_ENUM).map((sexKey) => SEX_ENUM[sexKey]);

const loginSchema = Joi.object().keys({
  email: Joi.string().email().max(256).required(),
  password: Joi.string().strip().required(),
});

const registerSchema = Joi.object().keys({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  phone: Joi.string().max(11).required(),
  dateOfBirth: Joi.date()
    .min("1-1-1930")
    .max("now")
    .required()
    .label("Date of birth"),
  gender: Joi.string().valid(allSexValue).required(),
  address: Joi.string().required(),
  email: Joi.string().email().max(256).required(),
  password: Joi.string().min(6).max(20).required().label("Password"),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Password confirm"),
});

const changePasswordSchema = Joi.object().keys({
  password: Joi.string().min(6).max(20).required().label("Password"),
  newPassword: Joi.string().min(6).max(20).required().label("New Password"),
  confirmNewPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("New Password confirm"),
});

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().max(256).required(),
});

const resetPasswordSchema = Joi.object().keys({
  resetPwdToken: Joi.string().strip().required(),
  newPassword: Joi.string().min(6).max(20).required().label("Password"),
  confirmNewPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("Password confirm"),
});

export default {
  loginSchema,
  registerSchema,
};
