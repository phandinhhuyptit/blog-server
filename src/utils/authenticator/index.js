import jwt from "jsonwebtoken";
import { client } from "../redis";
import { createToken } from "../jwt";
import configs from "../../configs/config";
import ServerError from "../serverError";
import RevokedToken from "../../models/revokedToken.js";
import { REFESH_TOKEN, ACCESS_TOKEN } from "../constant";

const redisClient = client;

const getAllToken = async (user) => {
  const accessToken = await createToken(user, ACCESS_TOKEN);
  const refreshToken = await createToken(user, REFESH_TOKEN);
  return {
    accessToken,
    refreshToken,
  };
};

const getAccessToken = async (user) => {
  const accessToken = await createToken(user, ACCESS_TOKEN);
  return accessToken;
};

const getRefreshToken = async (user) => {
  const refreshToken = await createToken(user, REFESH_TOKEN);
  return refreshToken;
};

const verifyAccessToken = async (token) => {
  try {
    const logouted =
      (await redisClient.getAsync(token)) == "logouted" ? true : false;
    if (logouted) throw ServerError("Token had expired");
    const { userId } = jwt.verify(token, configs.JWT_SECRET_TOKEN);
    return userId;
  } catch (error) {
    throw error;
  }
};

const expiryAccessToken = async (token) => {
  await redisClient.setAsync(
    token,
    "logouted",
    "EX",
    configs.ACCESS_TOKEN_EXPIRE
  );
  return;
};

const verifyRefreshToken = async (token) => {
  try {
    const Obj = {};
    Object.assign(Obj, { token: token });
    const revokedToken = await RevokedToken.findOne(Obj);
    if (revokedToken) throw ServerError("Token had expired");
    const { user } = jwt.verify(token, configs.JWT_SECRET_TOKEN);
    return user;
  } catch (error) {
    throw error;
  }
};

const expiryRefreshToken = async (token) => {
  const { exp } = await jwt.verify(token, configs.JWT_SECRET_TOKEN);
  const expiredDate = new Date(exp * 1000);
  const createToken = {
    token,
    expiredAt: expiredDate,
  };
  const revokedToken = new RevokedToken(createToken).save();
  return revokedToken;
};

export default {
  getAllToken,
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  expiryAccessToken,
  expiryRefreshToken,
};
