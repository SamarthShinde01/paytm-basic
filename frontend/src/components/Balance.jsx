export const Balance = ({ value }) => {
	return (
		<div className="flex items-center p-4 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
			<div className="text-gray-800 font-medium text-lg">Your Balance</div>
			<div className="ml-auto text-3xl font-bold text-green-700">
				Rs {value}
			</div>
		</div>
	);
};
