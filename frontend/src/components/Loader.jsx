import BeatLoader from "react-spinners/BeatLoader";

export const Loader = () => {
	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "black",
	};
	return (
		<BeatLoader
			// loading={loading}
			cssOverride={override}
			size={20}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
};
