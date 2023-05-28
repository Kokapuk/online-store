import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Purchase } from '../types';

export const purchasesApi = createApi({
  reducerPath: 'purchasesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAll: builder.query<Purchase[], string>({
      query: (token) => ({
        url: '/purchases',
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetAllQuery } = purchasesApi;
