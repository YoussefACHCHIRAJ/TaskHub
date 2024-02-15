import { configureStore } from "@reduxjs/toolkit";
import onlineUsersSlice from "./onlineUsers/onlineUsersSlice";

export const store = configureStore({
    reducer: {
        onlineUsers: onlineUsersSlice
    },
});