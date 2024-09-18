import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
	return (
		<div className="bg-slate-300 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<div className="flex justify-center">
					<Heading label="Sign up" />
				</div>

				<SubHeading label="Enter your information to create an account" />
				<form className="space-y-4">
					<InputBox placeholder="John" label="First Name" />
					<InputBox placeholder="Doe" label="Last Name" />
					<InputBox placeholder="harkirat@gmail.com" label="Email" />
					<InputBox placeholder="123456" label="Password" />
					<Button label="Sign up" />
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
