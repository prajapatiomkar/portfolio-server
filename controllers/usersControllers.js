import jwt from "jsonwebtoken";
import { validateLogin, validateRegister } from "../utils/validator.js";
import { UserModel } from "../models/userModel.js";

import { generateJwtToken } from "../utils/generateJwtToken.js";

const registerController = async (req, res) => {
  const { error, value } = validateRegister(req.body);
  if (!error) {
    try {
      const user = await UserModel.create(value);
      user.save();
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
  res.send(error);
};

const loginController = async (req, res) => {
  try {
    const {
      error,
      value: { email, password },
    } = validateLogin(req.body);

    if (error) {
      // Handle validation errors
      return res.status(400).send(error.details[0].message);
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    const isPasswordMatching = await user.matchPassword(password);

    if (!isPasswordMatching) {
      return res.status(401).send("Incorrect password");
    }
    generateJwtToken(res, user._id);
    res.send({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const protectedController = (req, res) => {
  res.send({ message: "you have protected route access." });
};

export { registerController, loginController, protectedController };
