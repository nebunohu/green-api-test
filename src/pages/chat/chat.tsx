import { FC } from "react";
import styles from './chat.module.css';
import Chat from "../../components/chat/chat";
import Header from "../../components/header/header";

const ChatPage: FC = () => {
    return (
        <div
            className={`${styles.wrapper}`}
        >
            <Header />
            <Chat />
        </div>
    );
};

export default ChatPage;