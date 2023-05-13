import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { Credentials } from "../../app/types";
import { setCredentials } from "../../redux/app-slice";
import styles from './login-form.module.css';
import { useForm } from "react-hook-form";

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formState, setFormState] = useState<Credentials>({ idInstance: '', apiTokenInstance: '' });
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Credentials>();

    const submitHandler = handleSubmit((data) => {
        dispatch(setCredentials(data));
        navigate('/create-chat');
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <form
            className={`${styles.wrapper}`}
            onSubmit={submitHandler}
        >
            <label
                className={`${styles.inputWrapper}`}
                htmlFor="idInstance"
            >
                idInstance
                <input
                    className={`${errors.idInstance ? styles.error : ''}`}
                    {...register("idInstance", { required: true })}
                    id="idInstance"
                    value={formState.idInstance}
                    onChange={inputHandler}
                />
            </label>
            <label
                className={`${styles.inputWrapper}`}
                htmlFor="apiTokenInstance"
            >
                apiTokenInstance
                <input
                    className={`${errors.apiTokenInstance ? styles.error : ''}`}
                    {...register("apiTokenInstance", { required: true })}
                    id="apiTokenInstance"
                    value={formState.apiTokenInstance}
                    onChange={inputHandler}
                />
            </label>
            <button
                type="submit"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
