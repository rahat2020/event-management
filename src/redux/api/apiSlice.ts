import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apis = createApi({
    reducerPath: 'apis',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({

        // USER REGISTRATION 
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Events']
        }),

        // USER LOGIN 
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Events']
        }),

        // UPDATE USER DATA
        updateUserData: builder.mutation({
            query: (data) => {
                const { id, ...body } = data;
                return {
                    url: `/auth/update-user/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Events']
        }),
        // GET USER OWN DATA
        getUserDataByEmail: builder.query({
            query: (email) => `/auth/user-data?email=${email}`,
            providesTags: ['Events']
        }),

        // GET USER OWN EVENT DATA
        getUserEventDataByEmail: builder.query({
            query: (email) => `/auth/user?email=${email}`,
            providesTags: ['Events']
        }),

        // DELETE USER PROFILE
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/v1/deleteuser/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['Events']
        }),

        // CREAE NEW EVENT
        createNewEvent: builder.mutation({
            query: (data) => ({
                url: '/events/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Events']
        }),

        // UPDATE EVENT
        updateEvent: builder.mutation({
            query: (data) => {
                const { id, ...body } = data
                console.log('apiSlice-Update-data', body)
                console.log('apiSlice-Update-ID', id)
                return {
                    url: `/events/update/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Events']
        }),
        // ATTAND IN THE EVENTS
        attandInTheEvent: builder.mutation({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: `/events/attand/${id}`,
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Events']
        }),
        // GET ALL EVENTS
        getAllEvents: builder.query({
            query: () => '/events/get',
            providesTags: ['Events']
        }),

        // GET SINGLE EVENTS
        getSingleEvents: builder.query({
            query: (id) => `/events/get/${id}`,
            providesTags: ['Events']
        }),

        // DELETE EVENTS
        deleteEvents: builder.mutation({
            query: (id) => ({
                url: `/events/delete/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['Events']
        }),


    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserDataByEmailQuery,
    useUpdateUserDataMutation,
    useDeleteUserMutation,
    useCreateNewEventMutation,
    useDeleteEventsMutation,
    useGetSingleEventsQuery,
    useGetAllEventsQuery,
    useAttandInTheEventMutation,
    useUpdateEventMutation,
    useGetUserEventDataByEmailQuery
} = apis