import { useEffect, useState } from "react";
import { useBalanceMutation } from "../slices/userApiSlices";

export const Balance = () => {
	const [balance, setBalance] = useState(0);

	const [balanceApi, { isLoading }] = useBalanceMutation();

	useEffect(() => {
		const fetchBalance = async () => {
			const response = await balanceApi().unwrap();
			setBalance(response.balance.toFixed(2));
		};
		fetchBalance();
	}, []);

	return (
		<div className="flex items-center p-4 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
			<div className="text-gray-800 font-medium text-lg">Your Balance</div>
			<div className="ml-auto text-3xl font-bold text-green-700">
				{isLoading ? <p>.......</p> : <p>Rs {balance}</p>}
			</div>
		</div>
	);
};
