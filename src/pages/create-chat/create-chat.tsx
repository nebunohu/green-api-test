import { FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setChatId } from "../../redux/app-slice";
import { useNavigate } from "react-router";

const CreateChatPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setChatId(phone+'@c.us'));
        navigate('/chat');
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Создать чат
                </button>
            </form>
        </div>
    );
};

export default CreateChatPage;