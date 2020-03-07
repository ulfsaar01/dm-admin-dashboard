import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

import './index.css'
import App from './App'
import rootReducer from './redux/reducers'

import * as serviceWorker from './serviceWorker'

import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

import simpleNumberLocalizer from 'react-widgets-simple-number';

Moment.locale('en')
momentLocalizer()
simpleNumberLocalizer()

export const store = createStore(rootReducer, applyMiddleware(thunk))

Amplify.configure(awsconfig)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
