import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch, useSelector} from "react-redux";

import LoadingScreen from "../screens/LoadingScreen";
import {AppState} from "../store/configureStore";
import {GetMapData} from "../store/actions/mapAction";
import MapScreen from "../screens/MapScreen";

const MyStack = createStackNavigator();

const AppNavigator = () => {

  const isDataReady = useSelector((state: AppState) => state.mapData.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMapData());
  }, [])

  return (
    <NavigationContainer>
      <MyStack.Navigator screenOptions={{headerShown: false}}>
        {isDataReady && <MyStack.Screen  name="LoadingScreen" component={LoadingScreen}/>}
        {!isDataReady && <MyStack.Screen name="MapScreen" component={MapScreen} />}
      </MyStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;
