import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { SendMoney } from "./pages/SendMoney.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { PrivateRoutes } from "./components/PrivateRoutes.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			{/* redirect from / to /signup */}
			{/* <Route index element={<Navigate to="/signin" />} /> */}

			<Route path="/signup" element={<Signup />} />
			<Route path="/signin" element={<Signin />} />

			<Route path="" element={<PrivateRoutes />}>
				<Route index element={<Navigate to="/dashboard" />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/send" element={<SendMoney />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	</Provider>
);
