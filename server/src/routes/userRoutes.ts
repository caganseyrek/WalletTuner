import express, { Router } from "express";

import deleteUserController from "@/controllers/user/deleteUser";
import loginController from "@/controllers/user/login";
import logoutController from "@/controllers/user/logout";
import registerController from "@/controllers/user/register";
import resetPasswordController from "@/controllers/user/resetPassword";
import updateUserController from "@/controllers/user/updateUser";
import userSettingsController from "@/controllers/user/userSettings";

import auth from "@/middleware/auth";
import validateUser from "@/middleware/validation/validateUser";

const router: Router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/settings", auth, validateUser, userSettingsController);

router.post("/logout", auth, validateUser, logoutController);
router.patch("/resetpw", auth, validateUser, resetPasswordController);
router.patch("/update", auth, validateUser, updateUserController);
router.delete("/delete", auth, validateUser, deleteUserController);

export const userRoutes: Router = router;
