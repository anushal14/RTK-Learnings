import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './tasks'
import employeeReducer from './employees'
import log from "./middleware/log";
import error from "./middleware/error";
import api from "./middleware/api";

const store = configureStore(
    {
        reducer: {
            tasks: taskReducer,
            employees: employeeReducer
        },
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), log, api, error]
    }
)

export default store;