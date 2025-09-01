import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (type) => ({
                url: `get-orders`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
           getStripePublishablekey: builder.query({
            query: () => ({
                url: `/payment/stripepublishablekey`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        cretePaymentIntet: builder.mutation({
            query: (amount) => ({
                url: `/payment`,
                method: "POST",
                body: {
                    amount,
                },
                credentials: "include" as const,
            }),
        }),
         createOrder: builder.mutation({
            query: ({courseId,payment_Info}) => ({
                url: `/create-order`,
                body: {
                    courseId,
                    payment_Info,
                },
                 method: "POST",
                credentials: "include" as const,
            }),
        }),
    })
})


export const {
    useGetAllOrdersQuery,
    useGetStripePublishablekeyQuery,
    useCretePaymentIntetMutation,
    useCreateOrderMutation,
     } = ordersApi;