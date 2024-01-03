import jwt from "jsonwebtoken";

const generateJwtToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== "development",
    secure: true,
    sameSite: "None",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export { generateJwtToken };
