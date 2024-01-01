import express from "express";

import {
  registerController,
  loginController,
  protectedController,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/protected", protectedController);

export default router;
