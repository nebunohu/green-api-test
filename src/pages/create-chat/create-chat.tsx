import { FC } from "react";
import CreateChatForm from "../../components/create-chat-form/create-chat-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../redux/app-slice";

const CreateChatPage: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <CreateChatForm />
            <Link
                to="/"
                onClick={() => dispatch(logout())}
            >
                Выйти
            </Link>
        </div>
    );
};

export default CreateChatPage;