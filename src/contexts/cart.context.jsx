import { createContext, useReducer } from "react";
//Reducer is good to use when one object changes need to modified many other objects
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        //better not make anything complicated for readability
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default: new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, cartItem)=> total + (cartItem.quantity * cartItem.price), 0)
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems, 
            cartCount: newCartCount, 
            cartTotal: newCartTotal
        }));
    }

    const setIsCartOpen = (cartOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,cartOpen))
    }

    const addItemToCart= (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart= (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart= (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }


    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}