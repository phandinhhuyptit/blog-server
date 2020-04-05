import jwt from "jsonwebtoken";
import configs from "../../configs/config";

export const createToken = (user, type) => {
  return new Promise((resolve, reject) => {
    if ((type = "ACCESS_TOKE"))
      `Bearer ${jwt.sign(
        { user },
        configs.JWT_SECRET_TOKEN,
        {
          expiresIn: configs.ACCESS_TOKEN_EXPIRE,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          return resolve(token);
        }
      )}`;
    else
      `Bearer ${jwt.sign(
        { user },
        configs.JWT_SECRET_TOKEN,
        {
          expiresIn: configs.REFESH_TOKEN_EXPIRE,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          return resolve(token);
        }
      )}`;
  });
};
