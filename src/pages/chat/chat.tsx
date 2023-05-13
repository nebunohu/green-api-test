import { FC } from "react";
import styles from './chat.module.css';
import Chat from "../../components/chat/chat";
import ChatInput from "../../components/chat-input/chat-input";
import Header from "../../components/header/header";

const ChatPage: FC = () => {
    return (
        <div
            className={`${styles.wrapper}`}
        >
            <Header />
            <Chat />
            <ChatInput />
        </div>
    );
};

export default ChatPage;