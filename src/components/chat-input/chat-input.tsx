import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useSendMesssageMutation } from "../../redux/messages-api/messages-api";
import styles from './chat-input.module.css';

const ChatInput: FC = () => {
    const {
        idInstance,
        apiTokenInstance,
        chatId,
    } = useAppSelector((store) => store.app);
    const [sendMessage] = useSendMesssageMutation();
    const [inputState, setInputState] = useState('');
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        sendMessage({
            credentials: {
                idInstance,
                apiTokenInstance,
            },
            requestBody: {
                chatId: chatId,
                message: inputState,
            },
        });
        setInputState('');
    };
    
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState(e.target.value);
    };
    return (
        <form
            className={`${styles.chatInputWrapper}`}
            onSubmit={submitHandler}
        >
            <input
                className={`${styles.chatInput}`}
                value={inputState}
                onChange={inputHandler}
            />
            <button
                type="submit"
            >
                Отправить
            </button>
        </form>
    );
};

export default ChatInput;