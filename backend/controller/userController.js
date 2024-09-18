import asyncHandler from "express-async-handler";
import { userAuthZod, userRegisterZod } from "../config/zodSchema.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import Account from "../models/accountModel.js";

// POST api/users/auth PUBLIC
const userAuthController = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	const { success } = userAuthZod.safeParse(req.body);
	if (!success) {
		res.status(400);
		throw new Error("Validation Error");
	}

	const userExist = await User.findOne({ username });
	if (!userExist) {
		res.status(400);
		throw new Error("User does not exist");
	}

	const matchPassword = await bcrypt.compare(password, userExist.password);

	if (matchPassword && userExist) {
		generateToken(res, userExist._id);
		return res
			.status(200)
			.json({ message: `${userExist.firstName} logged In Successfully` });
	} else {
		res.status(400);
		throw new Error("Invalid password, try again");
	}
});

// POST api/users/ PUBLIC
const userRegisterController = asyncHandler(async (req, res) => {
	const { firstName, lastName, username, password } = req.body;
	const { success } = userRegisterZod.safeParse(req.body);

	if (!success) {
		res.status(400);
		throw new Error("Validation Error");
	}

	const userExist = await User.findOne({ username });
	if (userExist) {
		res.status(400);
		throw new Error("Username already exists, please try another one.");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		firstName,
		lastName,
		username,
		password: hashedPassword,
	});

	const account = await Account.create({
		userId: user._id,
		balance: 1 + Math.random() * 10000,
	});

	user.accounts.push(account._id);

	await user.save();

	if (user && account) {
		generateToken(res, user._id);
		return res.status(200).json({ user });
	} else {
		res.status(404);
		throw new Error("Something went wrong");
	}
});

// POST api/users/logout
const userLogoutController = asyncHandler(async (req, res) => {
	await res.cookie("jwt", "", { expires: new Date(0) });
	return res.status(200).json({ message: "Logged out successfully" });
});

// GET  api/users/profile
const getUserProfileController = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		username: req.user.username,
	};

	return res.status(200).json(user);
});

// PUT api/users/profile
const updateUserProfileController = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(400);
		throw new Error("User does not exist");
	}

	user.firstName = req.body.firstName || user.firstName;
	user.lastName = req.body.lastName || user.lastName;

	if (req.body.password) {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		user.password = hashedPassword;
	}

	const updatedUser = await user.save();
	if (updatedUser) {
		return res.status(200).json(updatedUser);
	} else {
		res.status(400);
		throw new Error("Something went wrong");
	}
});

//PUBLIC GET  /api/users/bulk
const userBulkController = asyncHandler(async (req, res) => {
	const filter = req.query.filter || "";

	const users = await User.find({
		$or: [
			{
				firstName: { $regex: filter },
			},
			{
				lastName: { $regex: filter },
			},
		],
	});

	return res.status(200).json({
		user: users.map((user) => ({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
		})),
	});
});

export {
	userAuthController,
	userRegisterController,
	userLogoutController,
	getUserProfileController,
	updateUserProfileController,
	userBulkController,
};
