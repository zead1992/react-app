import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store/store";
import {createMuiTheme, Theme, ThemeProvider} from '@material-ui/core';
import './index.css';
import "./plugins/i18next/i18n"

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
        <Suspense fallback={"... is loading"}>
            <BrowserRouter>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
