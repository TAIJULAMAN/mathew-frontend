import { baseApi } from "./baseApi";

const clientPortalApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getClientPortal: build.query({
            query: () => ({
                url: "/client-portal",
                method: "GET",
            }),
            providesTags: ["ClientPortal"],
        }),
    }),
    overrideExisting: true,
});

export const { useGetClientPortalQuery } = clientPortalApi;