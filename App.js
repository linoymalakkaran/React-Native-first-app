import React, { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Button } from "react-native";

import { GoalInput } from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };

  const deleteGoalItem = (goalId) => {
    setCourseGoals((currentGoals) =>
      courseGoals.filter((goal) => goal.id !== goalId)
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Button title="Add Goal Item" onPress={() => setIsAddMode(true)} />
        <GoalInput visible={isAddMode} onAddGoalHandler={addGoalHandler} />
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              onDelete={deleteGoalItem.bind(this, itemData.item.id)}
              title={itemData.item.value}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
