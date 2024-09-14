import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name:"event",
    initialState:{
        events:null,
        refresh:false,
        isActive:true
    },

    reducers:{
        getAllTweets: (state, action) => {
            state.events = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload;
        }
    }
});

export const {getAllTweets, getRefresh, getIsActive} = eventSlice.actions;
export default eventSlice.reducer;