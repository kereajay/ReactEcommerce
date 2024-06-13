import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLogedin: false,
    userdetails:{},
    
}
const  validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        isSignedin: (state=initialState, action) => {
            state.isLogedin = action.payload
        },
        userdetailsadd:(state=initialState,action)=>{
            state.userdetails=action.payload
        }
    }
})

export const { isSignedin, userdetailsadd } = validationSlice.actions

const validationReducer = validationSlice.reducer

export default validationReducer