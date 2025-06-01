import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    userProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    userProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

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

export const { useGetTotalUsersQuery, useAllUserDataQuery , useUserProfileQuery , useUserProfileUpdateMutation} = userApi;
