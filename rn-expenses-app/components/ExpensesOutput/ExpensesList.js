import { Text, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
    return (
        /*
            description of the item to be displayed
            passing the data as description={description}, date={date}, amount={amount}
            since the props from ExpenseItem has the same name as the item. 
            we can use the spread operator
        */
        <ExpenseItem {...itemData.item} />
    );
};

function ExpensesList({expenses}) {
    return (
        <FlatList 
            data={expenses}
            renderItem={renderExpenseItem} //render the item to the screen
            keyExtractor={(item) => item.id} //use the id from DUMMY_DATA
        />
    );
};

export default ExpensesList;