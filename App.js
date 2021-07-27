import React from 'react';
import MainStackNavigator from './app/navigation/AppNavigator';
import {Provider as StoreProvider} from 'react-redux';
import store from './app/redux/store';
// Returns the App navigation, with accessing the redux store in all
// the pages
export default function App() {
  return (
    <StoreProvider store={store}>
      <MainStackNavigator />
    </StoreProvider>
  );
}
