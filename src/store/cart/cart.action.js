import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const setCartItems = (cartArray) => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartArray);

export const setIsCartOpen = (isCartOpen) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart= (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}
export const removeItemFromCart= (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}
export const clearItemFromCart= (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
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
