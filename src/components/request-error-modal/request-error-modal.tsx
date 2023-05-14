import { FC } from "react";
import Modal from "../modal/modal";
import { useAppDispatch } from "../../app/hooks";
import { closeModal } from "../../redux/app-slice";
import styles from  './request-error-modal.module.css';

type RequestErrorModalProps = {
    error: string;
};

const RequestErrorModal: FC<RequestErrorModalProps> = ({
    error,
}) => {
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            onClose={() => closeHandler()}
        >
            <div
                className={`${styles.wrapper}`}
            >
                {error}
                <button
                    onClick={() => closeHandler()}
                >
                    Закрыть
                </button>
            </div>
        </Modal>
    );
};

export default RequestErrorModal;