import { configureStore  } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import patientsReducer from "./patientsSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        patients: patientsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
