import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({});

const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"],
	endpoints: (builder) => ({}),
});

export default apiSlice;
