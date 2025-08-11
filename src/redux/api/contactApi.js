import { baseApi } from "./baseApi";
const contactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getContact: build.query({
            query: () => ({
                url: "/contact",
                method: "GET",
            }),
            providesTags: ["Contact"],
        }),
    }),
});
export const { useGetContactQuery } = contactApi;