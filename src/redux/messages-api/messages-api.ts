import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, DeleteNotificationResponse, Message, Notification, SendMessageParameters } from '../../app/types';

// const idInstance = process.env.REACT_APP_ID_INSTANCE;
// const apiTokenInstance = process.env.REACT_APP_API_TOKEN_INSTANCE;

export const messagesApi = createApi({
    reducerPath: 'stateQuery',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
    //   prepareHeaders: (headers) => {
    //     if (localStorage.getItem('token')) headers.set('Authorization', `Token ${localStorage.getItem('token')}`);
    //     return headers;
    //   },
    }),
    tagTypes: [
        'last-outgoing-messages',
        'notification',
    ],
    endpoints: (builder) => ({
        getLastOutgoingMessages: builder.query<Array<Message>, Credentials & { minutes?: number }>({
            query: ({
                idInstance,
                apiTokenInstance,
                minutes,
            }) => `waInstance${idInstance}/LastOutgoingMessages/${apiTokenInstance}${minutes ? `?minutes=${minutes}` : ''}`,
            providesTags: () => ['last-outgoing-messages'],
        }),
        getNotifications: builder.query<Notification, Credentials>({
            query: ({ idInstance, apiTokenInstance }) => `waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
            providesTags: () => ['notification'],
        }),
        deleteNotification: builder.mutation<DeleteNotificationResponse, Credentials & { receiptId?: number }>({
            query({
                idInstance,
                apiTokenInstance,
                receiptId,
            }) {
                return {
                    url: `waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
                    method: 'DELETE',
                };
            },
            // invalidatesTags: ['notification']
        }),
        sendMesssage: builder.mutation<any, { credentials: Credentials, requestBody: SendMessageParameters }>({
            query({
                credentials: {
                    idInstance,
                    apiTokenInstance,
                },
                requestBody: body
            }) {
                return {
                    url: `waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['last-outgoing-messages'],
        }),
    }),
});

export const {
    useGetLastOutgoingMessagesQuery,
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
    useSendMesssageMutation,
} = messagesApi;