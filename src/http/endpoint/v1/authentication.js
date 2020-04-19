import Authentication from "../../../controller/authentication";
import logger from "../../../utils/logger";
import authenticator from "../../../utils/authenticator";

export const signUpEndpoint = async (req, res) => {
  try {
    const user = await Authentication.signUp(req, res);
    res.json({
      message: "Success",
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};

export const signInEndPoint = async (req, res) => {
  const vailid = ["_id", "firstName", "lastName"];
  try {
    const user = await Authentication.signIn(req, res);
    const transformedUser = user.toJSON();
    const newUser = Object.keys(transformedUser).reduce((acc, key) => {
      if (vailid.includes(key)) {
        return { ...acc, [key]: user[key] };
      }
      return acc;
    }, {});
    const token = await authenticator.getAllToken(newUser);
    res.json({
      message: "Success",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        email: user.email,
        acessToken: token.accessToken,
        refreshToken: token.refreshToken,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};
