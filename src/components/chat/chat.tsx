import { FC, useEffect, useState } from "react";
import { useDeleteNotificationMutation, useGetNotificationsQuery } from "../../redux/messages-api/messages-api";
import { useAppSelector } from "../../app/hooks";
import { ChatMessage } from "../../app/types";
import Message from "../message/message";
import styles from './chat.module.css';
import ChatInput from "../chat-input/chat-input";

const Chat: FC = () => {
    const {
        idInstance,
        apiTokenInstance,
    } = useAppSelector((store) => store.app);
    const {
        data: notification,
        isSuccess: isGetNotificationSuccess,
        isFetching: isGetNotificationFetching,
        refetch: notificationRefetch,
    } = useGetNotificationsQuery({ idInstance, apiTokenInstance });
    const [
        deleteNotification
    ] = useDeleteNotificationMutation();
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    
    useEffect(() => {
        if (!isGetNotificationFetching && isGetNotificationSuccess && notification) {
            if (notification.body.typeWebhook === "outgoingAPIMessageReceived" ||
                notification.body.typeWebhook === 'incomingMessageReceived'
            ) {
                let text = '';
                if (notification.body.messageData?.extendedTextMessageData) {
                    text = notification.body.messageData.extendedTextMessageData.text;
                }
                if (notification.body.messageData?.textMessageData) {
                    text = notification.body.messageData.textMessageData.textMessage;
                }
                setMessages((prevState) => {
                    const newState = [...prevState];
                    const existingMessageIndex = prevState.findIndex((message) => message.idMessage === notification.body.idMessage);
                    if (existingMessageIndex !== -1) {
                            newState[existingMessageIndex].time = notification.body.timestamp;
                        return newState;
                    }
                    
                    return [
                        ...newState,
                        {
                            idMessage: notification.body.idMessage,
                            text: text,
                            time: notification.body.timestamp,
                            isOwn: notification.body.senderData?.chatId !== notification.body.senderData?.sender,
                        },
                    ]
                });
            }

            deleteNotification({
                idInstance,
                apiTokenInstance,
                receiptId: notification.receiptId,
            });
        }
    }, [isGetNotificationFetching]);

    useEffect(() => {
        const timerId = setInterval(() => {
            notificationRefetch();
        }, 3000);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    return (
        <>
            <div
                className={`${styles.wrapper}`}
            >
                {messages.map((message) => (
                    <Message
                        key={message.idMessage}
                        message={message}
                    />
                ))}
            </div>
            <ChatInput
                onSendMessage={(message: ChatMessage) => setMessages((prevState) => [...prevState, message])}
            />
        </>
    );
};

export default Chat;
