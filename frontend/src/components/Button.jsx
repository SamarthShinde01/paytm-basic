export function Button({ label, type = "button" }) {
	return (
		<button
			type={type}
			className="w-full text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105"
		>
			{label}
		</button>
	);
}
