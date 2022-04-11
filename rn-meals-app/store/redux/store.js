// install npm install @reduxjs/toolkit react-redux
import {  configureStore } from '@reduxjs/toolkit'

import favoritesReducer from './favorites';

export const store = configureStore({
    /*
        different slices of state, so of data and actions
        that can change that data that are used by redux
        to then cunstruct an overall store of data and actions
    */

    reducer: {
        /* 
            we add this key of our choice to point at the favorites reducer
            in order to tap into this reducer in different part of our app
        */
        favoriteMeals: favoritesReducer
    }
});