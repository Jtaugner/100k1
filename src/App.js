import React from 'react';
import './root.css'
import './App.css';
import Menu from "./components/menu";
import {directQuestions, reverseQuestions} from "./questions";
import Game from "./components/game";
import {connect} from "react-redux";
import {selectIsGame} from "./store/selectors";
import {SwitchTransition,CSSTransition} from "react-transition-group";

function App(props) {
    const {isGame} = props;
    return (
        <>
            <SwitchTransition>
                <CSSTransition
                    key={isGame}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames={isGame ? 'fade-left' : 'fade-right'}
                >
                    {isGame ? <Game/>
                        :
                        <Menu directQuestions={directQuestions}
                              reverseQuestions={reverseQuestions}/>}

                </CSSTransition>
            </SwitchTransition>



        </>
    );
}

export default connect((store)=>({
    isGame: selectIsGame(store)
}))(App);
