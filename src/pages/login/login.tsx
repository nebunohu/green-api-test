import { FC } from "react";
import LoginForm from "../../components/login-form/login-form";
import styles from './login.module.css';

const LoginPage: FC = () => {
    return (
        <div
            className={`${styles.wrapper}`}
        >
            <LoginForm />
        </div>
    );
};

export default LoginPage;
