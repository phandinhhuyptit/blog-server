import cryptojs from "crypto-js";
import configs from "../../configs/config";

const hash = (text) => {
  return cryptojs.SHA256(text, configs.SECRET_KEY).toString();
};

const verify = (text, hashed) => {
  return hashed === hash(text);
};

export default {
  hash,
  verify,
};
