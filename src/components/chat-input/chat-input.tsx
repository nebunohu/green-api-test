import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useSendMesssageMutation } from "../../redux/messages-api/messages-api";
import styles from './chat-input.module.css';
import { ChatMessage } from "../../app/types";

type ChatInputProps = {
    onSendMessage: (message: ChatMessage) => void;
}
const ChatInput: FC<ChatInputProps> = ({
    onSendMessage,
}) => {
    const {
        idInstance,
        apiTokenInstance,
        chatId,
    } = useAppSelector((store) => store.app);
    const [
        sendMessage,
        {
            data: sendMeddageResponse,
            isSuccess: isSendMessageSuccess,
        },      
    ] = useSendMesssageMutation();
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
    };
    
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState(e.target.value);
    };

    useEffect(() => {
        if (isSendMessageSuccess && sendMeddageResponse) {
            onSendMessage({
                idMessage: sendMeddageResponse.idMessage,
                text: inputState,
                isOwn: true,
                time: null,
            });
            setInputState('');
        }
    }, [isSendMessageSuccess, sendMeddageResponse]);

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