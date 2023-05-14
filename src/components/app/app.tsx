import React from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import styles from './app.module.css';
import LoginPage from '../../pages/login/login';
import CreateChatPage from '../../pages/create-chat/create-chat';
import ChatPage from '../../pages/chat/chat';
import ProtectedRoute from '../protected-route/protected-route';
import { useAppSelector } from '../../app/hooks';
import RequestErrorModal from '../request-error-modal/request-error-modal';

const router = createHashRouter([
  {
    path: "/*",
    element: <LoginPage />,
  },
  {
    path: "/create-chat",
    element: (
      <ProtectedRoute>
        <CreateChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: 
    (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const { modal } = useAppSelector((store) => store.app);
  return (
    <div className={`${styles.wrapper}`}>
      <RouterProvider
        router={router}
      />
      {modal.isOpen && (
        <>
          {(modal.type === 'error') && <RequestErrorModal error={modal.error} />}
        </>
      )}
    </div>
  );
}

export default App;
