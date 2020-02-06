
import React from 'react';
import { createStore,combineReducers } from 'redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LogIn from './src/components/Auth/LogIn'
import Header from './src/components/Header';
import Home from './src/components/Home';
import Reservations from './src/components/Reservations';
import ReservationDetails from './src/components/ReservationDetails';
import { Provider } from 'react-redux'
import MyProvider from './src/provider';
import store from './src/components/store'
export const initialState = {
  token: undefined
};

// A very simple store
let MainNavigator = createStackNavigator({
  Home: {screen: LogIn},
  Profile: {screen: Home},
  Reservations: {screen: Reservations},
  ReservationDetails: {screen: ReservationDetails}
});

let Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
          <Navigation/>
      </Provider>
    );
  }
}
