import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const logger = createLogger();
const store = createStore(
    rootReducer,applyMiddleware(logger)
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();
