import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import Noticia from './app/Noticia';
import HomeScreen from './app/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Noticia: Noticia
}, {
  initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);