import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import EditDeviceScreen from '../screens/EditDeviceScreen';
//Creating a stack navigator to be able to navigate through the screens
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    //Creating the navigation with a landing screen - HomeScreen
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: () => null}}
        initialRouteName="Home">
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
        <Stack.Screen name="EditDevice" component={EditDeviceScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
