import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useSigninMutation } from "../slices/userApiSlices";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader";

export const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/dashboard");
		}
	}, [navigate, userInfo]);

	const [signin, { isLoading }] = useSigninMutation();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (username === "" || password === "") {
			toast.error("Please insert the data");
			return;
		}
		try {
			const res = await signin({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Logged In Successfully");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="bg-slate-300 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<div className="flex justify-center">
					<Heading label="Sign in" />
				</div>

				<SubHeading label="Enter your credentials to access your account" />

				<form className="space-y-4" onSubmit={submitHandler}>
					<input
						placeholder="test@gmail.com"
						className="w-full px-2 py-1 border rounded border-slate-200"
						type="email"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						placeholder="test@98562"
						className="w-full px-2 py-1 border rounded border-slate-200"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{isLoading ? <Loader /> : <Button label="Sign in" type="submit" />}
				</form>
				<div className="pt-4">
					<BottomWarning
						label="Don't have an account?"
						buttonText="Sign up"
						to="/signup"
					/>
				</div>
			</div>
		</div>
	);
};
