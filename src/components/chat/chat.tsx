import { FC, useEffect, useState } from "react";
import { useDeleteNotificationMutation, useGetNotificationsQuery } from "../../redux/messages-api/messages-api";
import { useAppSelector } from "../../app/hooks";
import { Notification } from "../../app/types";
import Message from "../message/message";
import styles from './chat.module.css';

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
    const [notifications, setNotifications] = useState<Array<Notification>>([]);
    
    useEffect(() => {
        if (!isGetNotificationFetching && isGetNotificationSuccess && notification) {
            if (notification.body.typeWebhook === "outgoingAPIMessageReceived" ||
                notification.body.typeWebhook === 'incomingMessageReceived') setNotifications((prevState) => [...prevState, notification]);
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
        <div
            className={`${styles.wrapper}`}
        >
            {notifications.map((notification) => (
                <Message
                    key={notification.receiptId}
                    notification={notification}
                />
                
            ))}
        </div>
    );
};

export default Chat;
