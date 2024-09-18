import { useState } from "react";

export const Appbar = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="shadow-md h-16 flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-300 px-6">
			<div className="font-bold text-2xl text-gray-800">PayTM App</div>
			<div className="flex items-center space-x-4">
				<div className="text-lg font-medium text-gray-700">Hello, Samarth</div>
				<div className="relative">
					<div
						className="rounded-full h-12 w-12 bg-gray-400 flex items-center justify-center text-xl text-white font-semibold shadow-md hover:bg-gray-500 transition-colors cursor-pointer"
						onClick={toggleDropdown}
					>
						U
					</div>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
							<ul className="py-1">
								<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
									Profile
								</li>
								<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
									Settings
								</li>
								<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
									Logout
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
