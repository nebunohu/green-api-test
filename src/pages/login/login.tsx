import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../redux/app-slice";
import { Credentials } from "../../app/types";
import { useNavigate } from "react-router";

const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formState, setFormState] = useState<Credentials>({ idInstance: '', apiTokenInstance: '' });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setCredentials(formState));
        navigate('/create-chat');
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <form
                onSubmit={submitHandler}
            >
                <label
                    htmlFor="idInstance"
                >
                    idInstance
                    <input
                        name="idInstance"
                        id="idInstance"
                        value={formState.idInstance}
                        onChange={inputHandler}
                    />
                </label>
                <label
                    htmlFor="apiTokenInstance"
                >
                    apiTokenInstance
                    <input
                        name="apiTokenInstance"
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
        </div>
    );
};

export default LoginPage;
