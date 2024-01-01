import jwt from "jsonwebtoken";

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "10h" });
}

const registerController = (req, res) => {
  res.send("registerController");
};
const protectedController = (req, res) => {
  res.send("protectedController");
};
const loginController = (req, res) => {
  res.send("loginController");
};

export { registerController, loginController, protectedController };
