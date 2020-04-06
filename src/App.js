import React from 'react';
import logo from './logo.svg';
import './root.css'
import './App.css';
import Menu from "./components/menu";
import {directQuestions, reverseQuestions} from "./questions";
import {Route} from "react-router-dom";
import Game from "./components/game";

function App() {
    return (
        <>
            <Route path={'/menu'}
                   render={props => <Menu directQuestions={directQuestions}
                                          reverseQuestions={reverseQuestions}/>}/>
            <Route path={'/game'}
                    render={props => <Game/>} />

        </>
    );
}

export default App;
