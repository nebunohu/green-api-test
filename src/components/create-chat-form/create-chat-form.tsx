import { FC } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setChatId } from "../../redux/app-slice";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import styles from './create-chat-form.module.css';

const CreateChatForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<{ phone: string}>();

    const submitHandler = handleSubmit(({ phone }) => {
        const match = phone.match(/\d+/);
        if (match) {
            dispatch(setChatId(match[0]+'@c.us'));
            navigate('/chat');
        }
    });
    return (
        <form
            className={`${styles.wrapper}`}
            onSubmit={submitHandler}
        >
            <div>
                Введите номер телефона
            </div>
            <Controller
                control={control}
                name="phone"
                rules={{
                    required: true,
                    pattern: /\d{11}/,
                }}
                defaultValue=""
                render={({ field }) => (
                    <InputMask
                        className={`${errors.phone ? styles.error : ''}`}
                        {...field}
                        mask="+79999999999"
                    />
                )}
            />
            <button
                type="submit"
            >
                Создать чат
            </button>
        </form>
    );
};

export default CreateChatForm;
