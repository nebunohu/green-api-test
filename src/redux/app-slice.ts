import { createSlice } from "@reduxjs/toolkit";
import { Credentials } from "../app/types";

export type Action<T> = {
  type: string;
  payload: T;
}

const initialState = {
    idInstance: '',
    apiTokenInstance: '',
    chatId: '',
    isAuth: false,
    modal: {
      isOpen: false,
      error: '',
      type: '',
    }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setCredentials: (state, action: Action<Credentials>) => {
        return {
          ...state,
          ...action.payload,
          isAuth: true,
        };
      },
      setChatId: (state, action: Action<string>) => {
        state.chatId = action.payload;
      },
      clearChatId: (state) => {
        state.chatId = '';
      },
      logout: (state) => {
        state.chatId = '';
        state.apiTokenInstance = '';
        state.idInstance = '';
        state.isAuth = false;
      },
      openErrorModal: (state, action: Action<string>) => {
        state.modal.isOpen = true;
        state.modal.type = 'error';
        state.modal.error = action.payload;
      },
      closeModal: (state) => {
        state.modal.isOpen = false;
        state.modal.type = '';
        state.modal.error = '';
      },
    },
});

export const {
  setCredentials,
  setChatId,
  clearChatId,
  logout,
  openErrorModal,
  closeModal,
} = appSlice.actions;

export default appSlice.reducer;
