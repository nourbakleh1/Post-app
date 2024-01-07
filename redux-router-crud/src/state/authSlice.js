import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
        name:"auth",
        initialState:{id:1,isLoggedin:true,adminName:"nour"},
        reducers:{
                togglebtn:(state,action)=>{
                        state.isLoggedin=!state.isLoggedin;
                }
        }
});

export const {togglebtn}=authSlice.actions;
export default authSlice.reducer;