import apiSlice from "./apiSlice";

const USERS_URL = "/api/users";
const ACCOUNT_URL = "/api/account";

const userApiSlices = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signin: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: "POST",
				body: data,
			}),
		}),
		signup: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
				body: data,
			}),
		}),
		balance: builder.mutation({
			query: (data) => ({
				url: `${ACCOUNT_URL}/balance`,
				method: "GET",
				body: data,
			}),
		}),
	}),
});

export const {
	useSigninMutation,
	useSignupMutation,
	useLogoutMutation,
	useBalanceMutation,
} = userApiSlices;
