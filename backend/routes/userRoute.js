import express from "express";
import {
	getUserProfileController,
	updateUserProfileController,
	userAuthController,
	userLogoutController,
	userRegisterController,
} from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/auth", userAuthController);
router.post("/", userRegisterController);
router.post("/logout", userLogoutController);
router.get("/profile", protect, getUserProfileController);
router.put("/profile", protect, updateUserProfileController);

export default router;
