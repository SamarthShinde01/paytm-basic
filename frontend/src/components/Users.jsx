import { useState } from "react";
import { Button } from "./Button";

export const Users = () => {
	// Replace with backend call
	const [users, setUsers] = useState([
		{
			firstName: "Harkirat",
			lastName: "Singh",
			_id: 1,
		},
	]);

	return (
		<div className="p-6">
			<div className="font-bold text-2xl mb-4">Users</div>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search users..."
					className="w-full px-4 py-2 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				/>
			</div>
			<div>
				{users.map((user) => (
					<User key={user._id} user={user} />
				))}
			</div>
		</div>
	);
};

function User({ user }) {
	return (
		<div className="flex items-center justify-between p-3 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm">
			<div className="flex items-center">
				<div className="rounded-full h-14 w-14 bg-gray-200 flex items-center justify-center mr-4 text-2xl font-bold text-gray-700">
					{user.firstName[0]}
				</div>
				<div className="text-lg font-semibold text-gray-800">
					{user.firstName} {user.lastName}
				</div>
			</div>
			<div>
				<Button label={"Send Money"} />
			</div>
		</div>
	);
}
