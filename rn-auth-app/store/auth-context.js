// run npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    // store token from user
    token: '',
    isAuthenticated: false, 
    // method to check whether user is auth or not
    authenticate: (token) => {},
    // method to erase the token and clear the auth status
    logout: () => {}
});

function AuthContextProvider({ children }) {
    // useState to keep track of authtoken
    const [authToken, setAuthToken] = useState();
    

    // pass the token to the state
    function authenticate(token) {
        setAuthToken(token);
        // store new item in the local storage by giving a key
        // and the second arg is the item to be stored in string type
        AsyncStorage.setItem('token', token);
    };

    // clear the token funct
    function logout() {
        setAuthToken(null);
        // clear the local storage token when logout
        AsyncStorage.removeItem('token');
    };

    const value = {
        // point the const from state to the token in context
        token: authToken,
        // point the isAuth to authToken as a true or false value
        isAuthenticated: !!authToken,
        // point those 2 funct so that they're exposed through context
        authenticate: authenticate,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;