import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Appbar } from "../components/Appbar";

export const Profile = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Form submitted");
	};

	return (
		<>
			<Appbar />
			<div className="bg-gray-100 min-h-full  flex items-center justify-center">
				<div className="w-full  mt-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
					<Heading label="Edit Profile" />
					<form className="space-y-4" onSubmit={handleSubmit}>
						<InputBox placeholder="John" label="First Name" />
						<InputBox placeholder="Doe" label="Last Name" />
						<InputBox placeholder="johndoe123" label="Username" type="email" />
						<InputBox
							placeholder="johndoe123"
							label="Password"
							type="password"
						/>

						<InputBox
							placeholder="johndoe123"
							label="Confirm Password"
							type="password"
						/>
						<Button label="Save Changes" />
					</form>
				</div>
			</div>
		</>
	);
};
