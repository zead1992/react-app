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
import {createStore} from "redux";


//actions
const increment = () => {
    return {
        type: "INCREMENT",
    }
}

const decrement = () => {
    return {
        type: "DECREMENT",
    }
}

//reducers
const counter = (state = 0 ,action)=>{
    switch (action.type) {
        case "INCREMENT":
            return state +1
        case "DECREMENT":
            return state - 1
    }
}

//store
let store = createStore(counter);

store.subscribe(()=>{ console.log(store.getState())})

//dispatch
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
