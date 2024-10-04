import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/users/bulk?filter=" + filter)
			.then((response) => {
				setUsers(response.data.user);
			});
	}, [filter]);

	return (
		<div className="p-6">
			<div className="font-bold text-2xl mb-4">Users</div>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search users..."
					onChange={(e) =>
						setTimeout(() => {
							setFilter(e.target.value);
						}, 1000)
					}
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
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between p-1 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm">
			<div className="flex items-center">
				<div className="rounded-full h-12 w-12 bg-gray-200 flex items-center justify-center mr-4 text-2xl font-bold text-gray-700">
					{user.firstName[0]}
				</div>
				<div className="text-lg font-semibold text-gray-800">
					{user.firstName} {user.lastName}
				</div>
			</div>
			<div>
				<button
					onClick={(e) => {
						navigate("/send?id=" + user._id + "&name=" + user.firstName);
					}}
					type="button"
					className="w-full text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105"
				>
					Send Money
				</button>
			</div>
		</div>
	);
}
