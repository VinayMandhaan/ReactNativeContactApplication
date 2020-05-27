import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactList from './ContactList'
import GroupScreen from './GroupScreen'


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="GroupScreen" component={GroupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;