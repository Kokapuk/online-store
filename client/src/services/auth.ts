import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getMe: builder.query<User | null, string>({
      query: (token) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetMeQuery } = authApi;
