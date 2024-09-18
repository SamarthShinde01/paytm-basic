import asyncHandler from "express-async-handler";
import Account from "../models/accountModel.js";
import mongoose from "mongoose";

//GET api/accounts/balance PRIVATE
const accountBalanceController = asyncHandler(async (req, res) => {
	const account = await Account.findOne({ userId: req.user._id });
	if (!account) {
		res.status(400);
		throw new Error("account does not exist");
	}

	return res.status(200).json({ balance: account.balance });
});

//POST api/accounts/transfer   PRIVATE
const accountTransferController = asyncHandler(async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	const { to, amount } = req.body;

	const fromAccount = await Account.findOne({ userId: req.user._id });
	if (!fromAccount || fromAccount.balance < amount) {
		await session.abortTransaction();
		res.status(400);
		throw new Error("Insufficient balance");
	}

	const toAccount = await Account.findOne({ userId: to });
	if (!toAccount) {
		await session.abortTransaction();
		res.status(400);
		throw new Error("Invalid account");
	}

	await Account.updateOne(
		{ userId: req.user._id },
		{ $inc: { balance: -amount } }
	).session(session);

	await Account.updateOne(
		{ userId: to },
		{ $inc: { balance: amount } }
	).session(session);

	await session.commitTransaction();
	session.endSession();

	return res.status(200).json({
		message: "Amount transferred successfully",
		from: req.body._id,
		to: to,
	});
});

export { accountBalanceController, accountTransferController };
