import { api } from '@/utils/api';
import { configureStore } from '@reduxjs/toolkit';
import  cartReducer  from './features/cart/cartSlice'; 
import  userReducer  from './features/users/userSlice'; 



const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,

  
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
