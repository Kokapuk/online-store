import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAll: builder.query<Product[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllQuery } = productsApi;
