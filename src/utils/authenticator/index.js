import jwt from "jsonwebtoken";
import configs from "../../configs/config";
import { client } from "../redis";
import revokedTokenServices from "../services/auth";
import { createToken } from "../jwt";
import configs from "../../configs/config";
import ServerError from "../serverError";
import { REFESH_TOKEN, ACCESS_TOKEN } from "../constant";

const redisClient = client;

const getAllToken = async (userId) => {
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
    const revokedToken = await revokedTokenServices.findByRefreshToken(token);
    if (revokedToken) throw Error("Token had expired");
    const { userId } = jwt.verify(token, configs.JWT_SECRET_TOKEN);
    return userId;
  } catch (error) {
    throw error;
  }
};

const expiryRefreshToken = async (token) => {
  const { exp } = await jwt.verify(token, configs.JWT_SECRET_TOKEN);
  const expiredDate = new Date(exp * 1000);
  const revokedToken = await revokedTokenServices.createRevokedToken(
    token,
    expiredDate
  );
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
