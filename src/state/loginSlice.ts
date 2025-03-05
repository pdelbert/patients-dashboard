import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, LoginState } from "../entities/login";
import loginUseCase from "../usecase/LoginUseCase";
  
  const initialState: LoginState = {
    token: null,
    email: null
  };

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
        })
        .addCase(logOutAsync.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
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
        if (!response) return initialState;
        
        return {
            email: login.email,
            token: response?.token as string
        };
    }
  );

export default loginSlice.reducer;