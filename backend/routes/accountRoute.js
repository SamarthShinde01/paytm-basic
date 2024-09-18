import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
	accountBalanceController,
	accountTransferController,
} from "../controller/accountControllers.js";
const router = express();

router.get("/balance", protect, accountBalanceController);
router.post("/transfer", protect, accountTransferController);

export default router;
