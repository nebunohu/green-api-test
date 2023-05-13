import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './app.module.css';
import LoginPage from '../../pages/login/login';
import CreateChatPage from '../../pages/create-chat/create-chat';
import ChatPage from '../../pages/chat/chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/create-chat",
    element: <CreateChatPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <div className={`${styles.wrapper}`}>
      <RouterProvider
        router={router}
      />
    </div>
  );
}

export default App;
