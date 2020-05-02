import jwt from "jsonwebtoken";
import { client } from "../redis";
import { createToken } from "../jwt";
import configs from "../../configs/config";
import ServerError from "../serverError";
import RevokedToken from "../../models/revokedToken.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";

const redisClient = client;

const getAllToken = async (user) => {
  const accessToken = await createToken(user, ACCESS_TOKEN);
  const refreshToken = await createToken(user, REFRESH_TOKEN);
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
  const refreshToken = await createToken(user, REFRESH_TOKEN);
  return refreshToken;
};

const verifyAccessToken = async (token) => {
  try {
    const logouted =
      (await redisClient.getAsync(token)) == "logouted" ? true : false;
    if (logouted) throw new ServerError("Token had expired");
    const user = await new Promise((resolve, reject) =>
      jwt.verify(token, configs.JWT_SECRET_TOKEN, (error, payload) => {
        if (error) return reject(error);
        return resolve(payload);
      })
    );
    return user;
  } catch (error) {
    throw new ServerError(`${error.message}`);
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
    if (revokedToken) throw new ServerError("Token had expired");
    const user = await new Promise((resolve, reject) =>
      jwt.verify(token, configs.JWT_SECRET_TOKEN, (error, payload) => {
        if (error) return reject(error);
        return resolve(payload);
      })
    );
    return user;
  } catch (error) {
    throw new ServerError(`${error.message}`);
  }
};

const expiryRefreshToken = async (token) => {
  try {
    const { exp } = await new Promise((resolve, reject) =>
      jwt.verify(token, configs.JWT_SECRET_TOKEN, (error, payload) => {
        if (error) return reject(error);
        return resolve(payload);
      })
    );
    const expiredDate = new Date(exp * 1000);
    const createToken = {
      token,
      expiredAt: expiredDate,
    };
    const revokedToken = new RevokedToken(createToken).save();
    return revokedToken;
  }
  catch (error) {
    throw new ServerError(`${error.message}`);
  }
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
