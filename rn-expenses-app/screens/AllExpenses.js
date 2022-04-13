import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    // value that gives us our ExpensesContext with React
    const expensesCtx = useContext(ExpensesContext);

    return(
        // display the ExpensesOutput component 
        // set this expenses prop which is required by this component 
        // to be equal to our array of expenses by pointing at .expenses
        <ExpensesOutput 
            expenses={expensesCtx.expenses} 
            expensesPeriod='Total' 
            fallBackText='No registered expenses found!'
        />
            
    );
};

export default AllExpenses;