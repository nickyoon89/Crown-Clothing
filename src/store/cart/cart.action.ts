import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const setCartItems = withMatcher((cartArray: CartItem[]) =>
	createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartArray));

export const setIsCartOpen = withMatcher((isCartOpen: boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};
export const removeItemFromCart = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};
export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
	//find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingCartItem) {
		// If found, increment quantity
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	} else {
		// return new array with modified cartItems/ new cart Item
		return [...cartItems, { ...productToAdd, quantity: 1 }];
	}
};

const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	//find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	if (existingCartItem) {
		//just in case there is no matching Item
		if (existingCartItem.quantity > 1) {
			//decrease if the quantity value is over 1
			return cartItems.map((cartItem) =>
				cartItem.id === cartItemToRemove.id
					? { ...cartItem, quantity: cartItem.quantity - 1 }
					: cartItem
			);
		} else {
			//filter out if the quantity value is 1 or lower
			return cartItems.filter(
				(cartItem) => cartItem.id !== cartItemToRemove.id
			);
		}
	} else {
		//return the same array if there is no cart item matched
		return [...cartItems];
	}
};

const clearCartItem = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
): CartItem[] =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload <CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload <CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;