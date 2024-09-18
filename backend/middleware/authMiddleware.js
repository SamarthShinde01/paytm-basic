import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization) {
		token = req.headers.authorization;
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");

			next();
		} catch (err) {
			console.error(err);
			res.status(400);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(400);
		throw new Error("Not authorized , no token");
	}
});

export default protect;
