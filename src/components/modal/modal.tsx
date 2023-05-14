import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.css';

type ModalProps = {
    children: ReactNode,
    onClose: () => void;
};

const Modal: FC<ModalProps> = ({
    children,
    onClose,
}) => {
    const modalContainer = document.getElementById('modal-root');
    return createPortal(
        <div
            className={`${styles.overlay}`}
            onClick={() => onClose()}
        >
            {children}
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        modalContainer!
    );
}

export default Modal;