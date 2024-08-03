import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import chatReducer from "./chatSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer:{
        app:appReducer,
        chat:chatReducer,
        theme:themeReducer,
    }
})
export default store;
