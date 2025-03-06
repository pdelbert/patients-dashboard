import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, ILoginState } from "../entities/login";
import loginUseCase from "../usecase/LoginUseCase";
  
const initialState: ILoginState = {
  login: {
    email: null,
    token: null
  },
  loginMessage: {
    text: "",
    className: ""
  }
};

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginAsync.fulfilled, (state, action) => {
          if(action.payload.loginMessage) {
            state.loginMessage = action.payload.loginMessage
          }

          if(action.payload.token) {
            state.login.email = action.payload.email
            state.login.token = action.payload.token
          }
        })

        // LogOut.
        .addCase(logOutAsync.fulfilled, (state) => {
            state.login.token = null
            state.login.email = null
        });
    }
  });

  export const logOutAsync = createAsyncThunk(
    "login/logOutAsync",
    async () => {
        return initialState;
    }
  );
  
  export const loginAsync = createAsyncThunk(
    "login/loginAsync",
    async (login: Login) => {
        const response = await loginUseCase().login(login);
        if (!response) {
          return { loginMessage : {
            text: "Login Error",
            className: 'alert-error'
          }};
        } 
        
        return {
            email: login.email,
            token: response?.token
        };
    }
  );

export default loginSlice.reducer;