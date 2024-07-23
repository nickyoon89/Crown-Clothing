//import { CATEGORIES_ACTION_TYPES } from "./category.types";

import { CategoryAction } from "./category.action"
import { createSlice } from "@reduxjs/toolkit"
import { Category } from "./category.types";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE:CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categorySlice = createSlice({
    name: 'users',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        fetchCategoriesStart(state) {
            state.isLoading = true
        },
        fetchCategoriesSuccess(state, action){
            state.categories = action.payload;
            state.isLoading = false;
        },
        fetchCategoriesFailed(state, action){
            state.error = action.payload;
            state.isLoading = false;
        },
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
})
export const {setCategories} = categorySlice.actions;
export const categoriesReducer = categorySlice.reducer; //reducer is generated as well
/*

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} as AnyAction): CategoriesState =>{
    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading: true};
    }
    return state
    // switch(type){
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
    //         return {...state, isLoading: true};
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return {...state, categories:action.payload, isLoading:false};
    //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
    //         return {...state, error:action.payload, isLoading:false};
    //     default:
    //         return state;
    // }
}*/