import { useSelector } from "react-redux";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate("/signin");
		}
	}, []);

	return (
		<>
			<Appbar />
			<div className="m-8">
				<Balance />
				<Users />
			</div>
		</>
	);
};
