import { FC } from "react";
import { ChatMessage } from "../../app/types";
import styles from './message.module.css';
import { getTime } from "../../app/utils";

type MessageProps = {
    message: ChatMessage;
}

const Message: FC<MessageProps> = ({
    message: {
        text,
        time,
        isOwn,
    }
}) => {
    return (
        <div
            className={`${styles.wrapper} ${isOwn ? styles.own : ''}`}
        >
            <div>
                {text}
            </div>
            <div
                className={`${styles.time}`}
            >
                {time ? getTime(time) : ''}
            </div>
        </div>
    );
};

export default Message;
