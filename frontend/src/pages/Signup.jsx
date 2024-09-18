import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/userApiSlices";
import { setCredentials } from "../slices/authSlice";
import { Loader } from "../components/Loader";

export const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signup, { isLoading }] = useSignupMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (
			firstName === "" ||
			lastName === "" ||
			username === "" ||
			password === ""
		) {
			toast.error("Please insert all the fields");
			return;
		}

		try {
			const res = await signup({
				firstName,
				lastName,
				username,
				password,
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("User Registered Successfully");
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="bg-slate-300 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<div className="flex justify-center">
					<Heading label="Sign up" />
				</div>

				<SubHeading label="Enter your information to create an account" />
				<form className="space-y-4" onSubmit={submitHandler}>
					<input
						className="w-full px-2 py-1 border rounded border-slate-200"
						placeholder="First Name"
						value={firstName}
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<input
						className="w-full px-2 py-1 border rounded border-slate-200"
						placeholder="Last Name"
						value={lastName}
						type="text"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<input
						className="w-full px-2 py-1 border rounded border-slate-200"
						placeholder="Username"
						value={username}
						type="email"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						className="w-full px-2 py-1 border rounded border-slate-200"
						placeholder="Password"
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{isLoading && <Loader />}
					<Button label="Sign up" type="submit" />
				</form>
				<div className="pt-4 text-center">
					<BottomWarning
						label="Already have an account?"
						buttonText="Sign in"
						to="/signin"
					/>
				</div>
			</div>
		</div>
	);
};
