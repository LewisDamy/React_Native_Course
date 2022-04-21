// install axios with npm install axios
import axios from "axios";

// key from the FireBase website settings from this project
const API_KEY = '';

// function to construct the url dynamically
// function that calls the firebase REST API to make the 
// authentication and then return a token 
async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
            // send this dictonary format to the FireBase server 
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    console.log(response.data);
    // get from the response.data the token by the var idToken
    // see more in https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    const token = response.data.idToken;
    // return token to the await call from the request in LoginScreen and SignUpScreen
    return token;

    /* 
    .then(res => {
        console.info(res);
    })
    .catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.resquest);
        } else {
            console.log("Error", error.message);
        }
     })*/
};

export function createUser(email, password) {
    // function that calls the firebase REST API to make the 
    // authentication and then return a token by a token promise
    return authenticate('signUp', email, password);
};

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
};


