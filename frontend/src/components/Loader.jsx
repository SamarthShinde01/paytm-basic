import BeatLoader from "react-spinners/BeatLoader";

export const Loader = ({ color = "black", size = 20 }) => {
	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: color,
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<BeatLoader
				cssOverride={override}
				size={size}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};
