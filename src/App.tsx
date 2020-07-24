import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./store/reducers";

function App() {

    const counter = useSelector((state: RootState) => state.counter);

    return (
        <main className="container py-3">
            <h1>Counter: {counter}</h1>
        </main>
    );
}

export default App;
