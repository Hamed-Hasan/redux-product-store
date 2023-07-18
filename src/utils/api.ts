import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Replace with your backend base URL
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProduct: builder.query({
      query: (productId) => `/product/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/product',
        method: 'POST',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: 'DELETE',
      }),
    }),
    addComment: builder.mutation({
      query: ({ productId, comment }) => ({
        url: `/comment/${productId}`,
        method: 'POST',
        body: { comment },
      }),
      // Enable cache invalidation and real-time updates for comments
      // The comments query will be automatically refetched after a successful comment addition
      // The new comment will be added to the cache and reflected in the UI
      invalidatesTags: ['Comments'],
    }),
    getComments: builder.query({
      query: (productId) => `/comment/${productId}`, // Use the specific product ID to fetch comments
      // Enable caching of comments with a cache time of 10 seconds
      cacheTime: 10000,
      providesTags: ['Comments'],
    }),


    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: '/user/signup',
        method: 'POST',
        body: { email, password },
      }),
    }),


  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useLoginMutation, 
  useSignupMutation
} = api;
