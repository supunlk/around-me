/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './store/configureStore'
import AppNavigator from "./navigation/AppNavigator";
import {init} from './helpers/db'

console.log(init())

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    height: '100%',
  },
});

export default App;
