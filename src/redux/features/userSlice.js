import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalUsers: builder.query({
      query: () => ({
        url: "/dashboard/get-statistics",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    allUserData: builder.query({
      query: () => ({
        url: "/user/get-influencer",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetTotalUsersQuery, useAllUserDataQuery } = userApi;
