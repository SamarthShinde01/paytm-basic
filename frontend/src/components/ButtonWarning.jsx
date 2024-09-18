import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
	return (
		<div className="py-4 text-sm flex justify-center items-center bg-gray-50">
			<div className="text-gray-700">{label}</div>
			<Link
				className="underline text-blue-600 pl-2 hover:text-blue-500 transition-colors duration-300 ease-in-out"
				to={to}
			>
				{buttonText}
			</Link>
		</div>
	);
}
