import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Appbar } from "../components/Appbar";
import axios from "axios";

export const SendMoney = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const name = searchParams.get("name");
	const [amount, setAmount] = useState(0);

	const handleSubmit = async () => {
		try {
			await axios.post("http://localhost:3000/api/account/transfer", {
				to: id,
				amount,
			});

			toast.success(`Rs.${amount} has been sent successfully to ${name}`);
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
			toast.error(err);
		}
	};

	return (
		<>
			<Appbar />
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg space-y-6">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-800">Send Money</h2>
					</div>
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
							<span className="text-2xl text-white">
								{name[0].toUpperCase()}
							</span>
						</div>
						<h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="amount"
								className="block text-sm font-medium text-gray-600"
							>
								Amount (in Rs)
							</label>
							<input
								onChange={(e) => setAmount(e.target.value)}
								type="number"
								className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 px-3 py-2 sm:text-sm"
								id="amount"
								placeholder="Enter amount"
							/>
						</div>
						<button
							onClick={handleSubmit}
							className="w-full bg-green-500 text-white font-medium rounded-md py-2 transition duration-300 ease-in-out hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Initiate Transfer
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
