import { createSlice } from "@reduxjs/toolkit";
//import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        signInSuccess(state, action){
            state.currentUser = action.payload
        },
        signOutSuccess(state){
            state.currentUser = null
        },
        signUpSuccess(state){
        },
        signOutFailed(state, action){
            state.error = action.payload
        },
        signUpFailed(state, action){
            state.error = action.payload
        },
        signInFailed(state, action){
            state.error = action.payload
        }
    }
})

export const { setCurrentUser, signInFailed, signOutSuccess, signUpSuccess, signUpFailed, signInSuccess, signOutFailed} = userSlice.actions; //action is generated automatically
export const userReducer = userSlice.reducer; //reducer is generated as well

// export const userReducer = (state = INITIAL_STATE, action) => {
//     const {type, payload} = action;
//     switch(type) {
//         case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: payload
//             }
//         case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: null
//             }
//         case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//         case USER_ACTION_TYPES.SIGN_UP_FAILED:
//         case USER_ACTION_TYPES.SIGN_IN_FAILED:
//             return {
//                 ...state,
//                 error: payload
//             }
//         default:
//             return state; //in case it is not an action for userReducer
//     }
// }
