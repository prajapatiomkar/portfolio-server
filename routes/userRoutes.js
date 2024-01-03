import express from "express";

import passport from "passport";

import {
  registerController,
  loginController,
  protectedController,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/protected", passport.authenticate("jwt"), protectedController);

export default router;
