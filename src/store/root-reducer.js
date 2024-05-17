import {combineReducers} from '@reduxjs/toolkit';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

//every time any of the reducers change, the reducer is "new" one, not only change the changed reducer
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})