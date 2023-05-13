import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearChatId, logout } from "../../redux/app-slice";

const Header: FC = () => {
    const { chatId } = useAppSelector((store) => store.app);
    const dispatch = useAppDispatch();
    return (
        <header
            className={`${styles.wrapper}`}
        >
            <div>
                {chatId}
            </div>
            <div
                className={`${styles.controls}`}
            >
                <Link
                    to='/create-chat'
                    onClick={() => dispatch(clearChatId())}
                >
                    Закрыть чат
                </Link>
                <Link
                    to='/'
                    onClick={() => dispatch(logout())}
                >
                    Выйти
                </Link>
            </div>
        </header>
    );
};

export default Header;
