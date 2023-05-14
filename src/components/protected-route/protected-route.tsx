import { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((store) => store.app);
    useEffect(() => {
        if (!isAuth) navigate('/');
    }, []);

    if (!isAuth) return null;
    
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;