import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearChatId } from "../../redux/app-slice";

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
            <div>
                <Link
                    to='/create-chat'
                    onClick={() => dispatch(clearChatId())}
                >
                    Закрыть чат
                </Link>
            </div>
        </header>
    );
};

export default Header;
