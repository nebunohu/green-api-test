import { FC } from "react";
import { Notification } from "../../app/types";
import styles from './message.module.css';

type MessageProps = {
    notification: Notification;
}

const Message: FC<MessageProps> = ({
    notification,
}) => {
    const isOwn = notification.body.senderData?.chatId !== notification.body.senderData?.sender;
    return (
        <div
            className={`${styles.wrapper} ${isOwn ? styles.own : ''}`}
        >
            {notification.body.messageData?.typeMessage === 'extendedTextMessage' && (
                <div
                >
                {notification.body.messageData.extendedTextMessageData?.text}
                </div>
            )}
            {notification.body.messageData?.typeMessage === 'textMessage' && (
                <div
                >
                {notification?.body.messageData.textMessageData?.textMessage}
                </div>
            )}
        </div>
    );
};

export default Message;
