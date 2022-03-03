import React, { useState } from 'react';
import { 
  StyleSheet, 
  View,  
  Button, 
  FlatList 
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  //useState to keep track of the list of the goals
  const [courseGoals, setCourseGoals] = useState([]);
  //useState to keep track when we click the Button to add a new goal
  const [isAddMode, setIsAddMode] = useState(false);
  
  //save the enteredGoal in a list of elements
  const addGoalHandler = goalTitle => {
    if(goalTitle.length === 0) {
      return;
    }
    //create an copy of the courseGoals with the new element
    setCourseGoals(currentGoals => [...currentGoals, 
      {id: Math.random().toString(), value: goalTitle}
    ]); 
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      // return a new copied array but filtering, aka removing the goal that has the right id
      return currentGoals.filter((goal) => goal.id !== goalId);  
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={() => setIsAddMode(true)}/>

      <GoalInput 
        visible={isAddMode} 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoalAdditionHandler}/>
      
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals} 
        renderItem={itemData => (
          <GoalItem 
            id={itemData.item.id} 
            onDelete={removeGoalHandler} 
            title={itemData.item.value}/>
        )}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      padding: 50
    }
});
