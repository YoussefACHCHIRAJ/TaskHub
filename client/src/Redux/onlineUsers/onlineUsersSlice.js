import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: null
}

const onlineUsersSlice = createSlice({
    name: "onlineUsersSlice",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setOnlineUsers } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;