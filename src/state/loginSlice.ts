import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, ILoginState } from "../entities/login";
import loginUseCase from "../usecase/LoginUseCase";
  
const initialState: ILoginState = {
  login: {
    email: null,
    token: null
  },
  loginMessage: {
    message: "",
    className: ""
  }
};

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (login: Login) => {
      const response = await loginUseCase().login(login);
      if (!response) {
        return { loginMessage : {
          message: "Invalid Login Inputs",
          className: 'alert-error'
        }};
      } 
      
      return {
          email: login.email,
          token: response?.token
      };
  }
);

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      logOut : (state) => {
        state.login = initialState.login;
        state.loginMessage = initialState.loginMessage;
      }
    },
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
      }
  });

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;