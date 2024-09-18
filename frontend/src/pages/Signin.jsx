import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
	return (
		<div className="bg-slate-300 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<div className="flex justify-center">
					<Heading label="Sign in" />
				</div>

				<SubHeading label="Enter your credentials to access your account" />
				<form className="space-y-4">
					<InputBox placeholder="harkirat@gmail.com" label="Email" />
					<InputBox placeholder="123456" label="Password" />
					<Button label="Sign in" />
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
