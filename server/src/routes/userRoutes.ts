import express, { Router } from "express";

import deleteUserController from "../controllers/user/deleteUserController";
import loginController from "../controllers/user/loginController";
import logoutController from "../controllers/user/logoutController";
import registerController from "../controllers/user/registerController";
import resetpwController from "../controllers/user/resetpwController";
import updateController from "../controllers/user/updateController";

import auth from "../middleware/auth";

const router: Router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/logout", auth, logoutController);
router.post("/resetpw", auth, resetpwController);
router.put("/update", auth, updateController);
router.delete("/delete", auth, deleteUserController);

export const userRoutes: Router = router;
