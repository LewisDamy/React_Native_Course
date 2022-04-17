// install npm install axios
import axios from "axios";

const BACKEND_URL = 'https://react-native-course-d8cbc-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData) {
    // added the url for our POST request and added another 
    // segment 'expenses.json' node
    // added the expense as an value to be passed with our object 
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    // from firebase we can acceds their id auto generated by .data.name
    const id = response.data.name;
    // return the id received from the firebase as part of the response when sending data
    return id;
};

// async function which will be executed when received the data 
// when we have the response from the server
export async function fetchExpenses() {
    // getting data from the app with GET request, once the data have received
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    // helper array to get the objs of our GET request 
    const expenses = [];

    // display what're getting from the backend
    // console.log(response.data);
    
    // interate though the data by the keys which will be the ids in our
    // firebase back end
    for (const key in response.data) {
        // transform each object received from the firebase to our format, 
        // by getting the key generated from our backend, the amount, of the
        // respective key obj, the description and the date in JS format
        const expenseObj = { 
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        // push the obj to our array of expenses
        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpense(id, expenseData) {
    // PUT request in order to update the expense by pointing at the id
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export function deleteExpense(id) {
    // DELETE request to delete the expecific id by passing it 
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};