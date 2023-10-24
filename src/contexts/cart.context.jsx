import { createContext, useEffect, useState } from "react";

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
    cartItem: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        setCartCount(cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0));
        setCartTotal(cartItems.reduce((total, cartItem)=> total + (cartItem.quantity * cartItem.price), 0));
    }, [cartItems])
    const addItemToCart= (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart= (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart= (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
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