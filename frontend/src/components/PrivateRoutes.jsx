import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return <>{userInfo ? <Outlet /> : <Navigate to={"/signin"} />}</>;
};
