import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
    // getting all our expenses
    const expensesCtx = useContext(ExpensesContext);

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