import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/scss/font-awesome.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./store/reducers/rootReducer";
import thunk from 'redux-thunk';
import {BrowserRouter} from "react-router-dom";
import {composeWithDevTools} from "redux-devtools-extension";
import {store} from "./store/store";
import {createMuiTheme, Theme, ThemeProvider} from '@material-ui/core';
import "antd/dist/antd.css";




const theme : Theme = createMuiTheme({
    palette:{
        primary:{
            main:'#c81616'
        },
        secondary:{
            main:'#63bb08'
        }
    }
})


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App startCounterFrom={4}/>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
