import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetToUserMutation } from "../slices/userApiSlices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appbar } from "../components/Appbar";

export const SendMoney = () => {
	const [toUser, setToUser] = useState("");
	const [amount, setAmount] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();

	const [getToUser, { isLoading }] = useGetToUserMutation();

	useEffect(() => {
		const to = searchParams.get("to");
		const fetchToUser = async () => {
			try {
				const res = await getToUser({ to }).unwrap();
				setToUser(res);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		};

		fetchToUser();
	}, []);

	return (
		<>
			<Appbar />
			<div className="flex justify-center items-center min-h-screen  bg-gradient-to-r from-gray-50 to-gray-100">
				<div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
					<h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
						Send Money
					</h2>

					<div className="flex items-center space-x-4 mb-6">
						<div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-md">
							<span className="text-3xl text-white">
								{toUser && toUser.firstName[0].toUpperCase()}
							</span>
						</div>
						<h3 className="text-2xl font-semibold text-gray-800">
							{toUser && toUser.firstName} {toUser && toUser.lastName}
						</h3>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<label
								className="text-sm font-medium text-gray-700"
								htmlFor="amount"
							>
								Amount (in Rs)
							</label>

							<input
								type="number"
								className="w-full h-12 border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
								id="amount"
								placeholder="Enter amount"
							/>
						</div>

						<button className="w-full h-12 bg-green-500 text-white rounded-md text-sm font-semibold transition hover:bg-green-600 focus:ring-4 focus:ring-green-300">
							Initiate Transfer
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
