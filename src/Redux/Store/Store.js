import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { amazonApi } from './Slices/Amazon'
import Cartslice from './Slices/Cartslice'
import validationReducer from './Slices/Validation'

export const store = configureStore({
  reducer: {
   
    [amazonApi.reducerPath]: amazonApi.reducer,
    cart:Cartslice,
    validate:validationReducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(amazonApi.middleware),
})


setupListeners(store.dispatch)