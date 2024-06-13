import { createSlice } from '@reduxjs/toolkit'
// const initialstate={
//     count:100,
// }
const initialState={
    cartItems:JSON.parse(localStorage.getItem("cartItems"))||[],
    
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        Add_to_cart:(state=initialState,action)=>{
            if(state.cartItems.length!==0){
            state.cartItems.map((y)=>{
                if(y.asin!==action.payload.asin){
                    
                
            state.cartItems.push(action.payload);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                }
            
        })
    }
    else{
        state.cartItems.push(action.payload);
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

    }
           

        },
        Remove_cart:(state=initialState,action)=>{
            state.cartItems=state.cartItems.filter((x)=>x.asin!==action.payload)
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        }
});

export const { Add_to_cart, Remove_cart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;