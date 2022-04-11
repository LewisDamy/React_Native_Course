/* 
    We're creating a so-called slice. That's our
    Redux Tookit freature for defining some state,
    some data, and some Actions that should be able 
    to change that data. 
*/

import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: { 
        ids: [] // id init state is an empty array
    },
    reducers: { // functions to change our state
        /*
            function add favorite passing the state arg is the latest state as 
            input and an action that can pass along when invoking this method
        */
        addFavorite: (state, action) => {
            state.ids.push(action.payload.id); 
            /*
                this is how we're going to push a new id to the list and it uses
                a payload property to transport any extra dfata we might attach
                to this function in the future
            */
        },
        removeFavorite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
            /*
                using the splice to remove an element of the array, and this funct 
                has 2 args the location of the item and how many we want to remove.
                Now to find the id to be removed from the state we use de indexof 
                passing the action payload to only remove the one item which has this id
            */  
        } 
    }
});

// we need to export this const that holds the reducer and the functions
export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;