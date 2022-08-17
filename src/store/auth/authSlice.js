import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        status: "checking",  // checking , not-Authentic , authentic
        uid: null,
        email: null,
        displayName: null,
        displaySurname : null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {

        login: (state , {payload}) => {
            state.status= "authentic";  // checking , not-Authentic , authentic
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.displaySurname =  payload.displaySurname;
            state.photoURL =  payload.photoURL;
            state.errorMessage =  null;
        },

        logout: (state, {payload}) => {
            state.status= "not-Authentic";  // checking , not-Authentic , authentic
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.displaySurname =  null;
            state.photoURL =  null;
            state.errorMessage =  payload?.errorMessage;
        },

        checkinCrediantals: (state) => {
            state.status = "checking"
        },
    },
})
// Action creators are generated for each case reducer function
export const { login, logout, checkinCrediantals } = authSlice.actions