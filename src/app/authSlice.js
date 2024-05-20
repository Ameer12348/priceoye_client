import {  createSlice } from "@reduxjs/toolkit";




export const authSlice = createSlice({
  name: "authentication",
  initialState: { user: null, token: "" },
  reducers:{
    setAuth(state,action){
        state.user = action.payload.user;
        state.token = action.payload.token
    }
  }
});

export const {setAuth} =  authSlice.actions
