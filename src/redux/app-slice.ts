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
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setCredentials: (state, action: Action<Credentials>) => {
        return {
          ...state,
          ...action.payload,
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
      },
    },
});

export const {
  setCredentials,
  setChatId,
  clearChatId,
  logout,
} = appSlice.actions;

export default appSlice.reducer;
