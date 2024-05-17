import { createSlice } from "@reduxjs/toolkit";
import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if(existingCartItem) {
        // If found, increment quantity
        return  cartItems.map((cartItem) => cartItem.id === productToAdd.id? 
            {...cartItem, quantity: cartItem.quantity + 1}:
            cartItem);
    } else {
        // return new array with modified cartItems/ new cart Item
        return [...cartItems, {...productToAdd, quantity: 1}];
    } 
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if(existingCartItem) {
        //just in case there is no matching Item
        if(existingCartItem.quantity > 1){
            //decrease if the quantity value is over 1
            return  cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id?
                {...cartItem, quantity: cartItem.quantity - 1}:
                cartItem);
        }else {
            //filter out if the quantity value is 1 or lower
            return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
        }
    } else {
        //return the same array if there is no cart item matched
        return [...cartItems];
    } 
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers:{
        addItemToCart(state, action){
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action){
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action){
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action){
            state.isCartOpen = action.payload
        }
    }
})

export const {addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen} = cartSlice.actions;
export const cartReducer = cartSlice.reducer; 

// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) =>{
//     const {type, payload} = action;
//     switch(type){
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {...state, cartItems:payload};
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {...state, isCartOpen:payload};
//         default:
//             return state;
//     }
// }