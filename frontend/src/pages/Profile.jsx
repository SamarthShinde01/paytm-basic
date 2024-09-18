import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Appbar } from "../components/Appbar";
import { useEffect, useState } from "react";
import { useUpdateMutation } from "../slices/userApiSlices";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

export const Profile = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const [updateApi, { isLoading }] = useUpdateMutation();
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		setFirstName(userInfo.firstName);
		setLastName(userInfo.lastName);
		setUsername(userInfo.username);
	}, [userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (confirmPassword !== password) {
			toast.warning("Password and Confirm Password not matches");
			return;
		}

		try {
			const res = await updateApi({
				firstName,
				lastName,
				username,
				password,
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			setPassword("");
			setConfirmPassword("");
			toast.success("User Updated Successfully");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Appbar />
			<div className="bg-gray-100 min-h-full flex items-center justify-center">
				<div className="w-full mt-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
					<Heading label="Edit Profile" />
					<form className="space-y-4" onSubmit={submitHandler}>
						<InputBox
							placeholder="John"
							label="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<InputBox
							placeholder="Doe"
							label="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<InputBox
							placeholder="johndoe123"
							label="Username"
							type="email"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<InputBox
							placeholder="********"
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<InputBox
							placeholder="********"
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Button label="Save Changes" type="submit" />
					</form>
				</div>
			</div>
		</>
	);
};
