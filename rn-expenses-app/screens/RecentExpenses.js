import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    // getting all our expenses
    const expensesCtx = useContext(ExpensesContext);

    // useState to know whether we're loading data or not
    const [isFetching, setIsFetching] = useState(true);
    
    // useState to know whether we've a problem or not
    const [error, setError] = useState();

    // React Hook to keep track of the http requests when 
    // the screen re renders so that when we add a new expense
    // it'll show up immediately in the screen because we've store it in 
    // our local context and we send it to the backend
    // this means we don't have to wait for fetching that data again from backend
    useEffect(() => {
        // async function because sending an http request is an async task!!!
        async function getExpenses() {

            // make false the laoding state saying that we're still loading data
            setIsFetching(true);
            try { //try to wait this var from server
            /* 
            that means it doesn't complete immediately
            this function yield a "promise"
            A promise is an object that will eventually give 
            you access to some other data 
            */ 
            // variable that stores the function that awaits for the information
            // to be received from the /util/http response
            const expenses = await fetchExpenses();
            // call the setExpense function by passing the expenses 
            expensesCtx.setExpenses(expenses);

        } catch (error) { // if not received
                // define what type of error we could be facing
                setError('Could not fetch expenses!');
            }
            // when the data is received, move back to true
            setIsFetching(false);
        } 

        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    };
    // there has been some error in either fetching data or receiving from server
    if(error && !isFetching) {
        return( //return this component
            <ErrorOverlay message={error} onConfirm={errorHandler}/>
        );
    }

    // when the data is fetching (aka loading) 
    if (isFetching) {   
        return(
            <LoadingOverlay />  
        );

    }

    // we only want to forward only our RecentExpenses  
    // then we have tho filter for only find the latest
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        // const give us the actual day
        const today = new Date();
        // give us the date 7 days ago
        const date7daysAgo = getDateMinusDays(today, 7);

        // return true if an expense has its state in that range of 7 days
        // if the date, often expense is > that, it's younger than it should be displayed
        return (expense.date >= date7daysAgo) && (expense.date <= today);
    });

    return(
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days" 
            fallBackText='No expenses register for the last 7 days.'
        />
    );
};

export default RecentExpenses;