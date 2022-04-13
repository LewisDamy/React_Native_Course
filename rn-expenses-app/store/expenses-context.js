import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.90,
        date: new Date('2022-04-11')
    },
    {
        id: 'e2',
        description: 'Chocolate Easter Egg',
        amount: 9.90,
        date: new Date('2022-04-09')
    },
    {
        id: 'e3',
        description: 'Wireless Mouse and Keyboard',
        amount: 119.90,
        date: new Date('2022-04-10')
    },
    {
        id: 'e4',
        description: 'A Book',
        amount: 14.90,
        date: new Date('2022-04-08')
    },
    {
        id: 'e5',
        description: 'Another Book ',
        amount: 14.90,
        date: new Date('2022-03-08')
    },
    {
        id: 'e6',
        description: 'Another Shoe',
        amount: 14.90,
        date: new Date('2022-03-05')
    },
];

// create our store of context
export const ExpensesContext = createContext({
    // define empty list of expenses
    expenses: [],
    // define function to add, by passing as props the obj desctruction
    // of the description,  amount and date of our expense
    addExpense: ({description, amount, date}) => {},
    // function to delete the expense by using id as argument
    deleteExpense: (id) => {},
    // function to update the expense with both the props to obj desctruction
    // and id in order to make this modification
    updateExpense: (id, {description, amount, date}) => {}
});

// function to manage the useReducer, and the args are provided from react
// in order to connect this function to the useReducer
function expensesReducer(state, action) {
    // control flow statement from JS, aka, an IF&ELSE like 
    switch(action.type) {
        case 'ADD':
            /* 
                return an new state by using annew object and a new array to 
                update the state in an immutable way, so that we don't mutate
                the original data in memory and then adding an id based in the 
                date and an random number
            */ 
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            // search in the state array if the id of the expense is the 
            // same as the one that we're looking forward
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            // var to get the item of the index that we've searched
            const updatableExpense = state[updatableExpenseIndex];
            /* 
                updating the item by getting the new info as action.payload.data which
                has {description, amount, date} this were provided by the arguments
                of the function updateExpense and overriding 
                the content that's on the updatableExpense existing values that we've
                just found out what were its index
            */
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            // to keep everything imutable and spread in our existing array 
            // with the spreadoperator and saving as an new const
            const updatedExpenses = [...state];
            // then update this list by changing the index of that value that we want
            // to update to the new item that we've changed
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            // new array based on the old array with one item updated
            return updatedExpenses;
        case 'DELETE':
            // return true for all the items where the id is not equals to the 
            // action.payload because if it's equal that's the item we wanna delete, 
            // and in that case, we want to return false to drop that item
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    /* use for state management
        The first element is our expensesState so the state that iwll be managed
        by this reducer, and then there'll be a dispatch function which we can to
        dispatch a new action to the expensesREducer function, which is then able
        to manipulate the state. Then wget as a new state in this component function
        which will be reevaluated if the state changes automatically through the React Hook
    */
    // passing as second argument the default array of expenses
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    // function to add an expense by calling the dispance function 
    // privided by the useReducer
    function addExpense(expenseData) {
        /* 
            in here we can pass an action that will be available by React
            inside of the expensesReducer function as second paramenter
            we added an 'type' in here passing the 'ADD' so that in the switch
            it's already expecting an type format. 
            Then I'll passed the expenseData from the argument of this funct
            as an "data" or in this case usually called as 'payload'.
        */
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        // same thing from the addExpense but in this case passing the id
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    // value object which bundles all our data and function together
    const value = {
        // expenses key that points at the stat which is 
        // recreated  whenever action is dispatched
        expenses: expensesState,
        // add the expense functions to the ones inside our ExpensesContextProvider
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    // add the value from the expenseContext to the value that bundles all our data
    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;
