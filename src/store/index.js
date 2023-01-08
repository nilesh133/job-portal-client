import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer";
import JobReducer from "./reducers/JobReducer";
import MessagesReducer from "./reducers/MessagesReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        job: JobReducer,
        messages: MessagesReducer
    }
})

export default store