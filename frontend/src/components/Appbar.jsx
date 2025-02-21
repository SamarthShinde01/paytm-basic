import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlices";
import { useDispatch, useSelector } from "react-redux";

export const Appbar = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [logoutApiCall, { isLoading }] = useLogoutMutation();

	const submitHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			toast.success("Logged out successfully");
			navigate("/signin");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="shadow-md h-16 flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-300 px-6">
			<Link to={"/dashboard"}>
				<div className="font-bold text-2xl text-gray-800">PayTM App</div>
			</Link>

			<div className="flex items-center space-x-4">
				<div className="text-lg font-medium text-gray-700">
					Hello, {userInfo.firstName}
				</div>
				<div className="relative">
					<div
						className="rounded-full h-12 w-12 bg-gray-400 flex items-center justify-center text-xl text-white font-semibold shadow-md hover:bg-gray-500 transition-colors cursor-pointer"
						onClick={toggleDropdown}
					>
						{userInfo.firstName[0].toUpperCase()}
					</div>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
							<ul className="py-1">
								<Link to="/profile">
									<li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
										Profile
									</li>
								</Link>

								<li
									onClick={submitHandler}
									className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
								>
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
