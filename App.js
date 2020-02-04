// import React from 'react';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// import { createStore,applyMiddleware,compose} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import appReducer,{initialState} from './src/redux/reducers'
// import thunk from 'redux-thunk'
// import { Provider } from 'react-redux'

// import Home from './src/components/Home'
// import LogIn from './src/components/Auth/LogIn'
// import Parkings from './src/components/Parking List/Parkings'

// const store = createStore(appReducer,initialState,compose(applyMiddleware(thunk)))


// const App = () => {
//   return(
//     <Provider store={store}>
//       <Router>
//         <Switch>
//           <Route path={'/'} exact component={Home}/>
//           <Route path={'/logIn'} component={LogIn}/>
//           <Route path={'/parkings'} component={Parkings}/>
//         </Switch>
//       </Router>
//     </Provider>
//   ) 
// }

// export default App
import React from 'react';
import { createStore,combineReducers } from 'redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LogIn from './src/components/Auth/LogIn'
import Parkings from './src/components/Parking List/Parkings'
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
