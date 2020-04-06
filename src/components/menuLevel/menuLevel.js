import React from 'react';
import './menuLevel.css'
import {connect} from "react-redux";
import {startGame} from "../../store/ac";
const classNames = require('classnames');
function MenuLevel(props) {
    const {questionNumber, question, answers, money, isLevelClosed, startGame} = props;
    const menuLevelClasses = classNames({
        'menuLevel': true,
        'levelClosed': isLevelClosed
    });
    return (
        <div className={menuLevelClasses} onClick={()=>{startGame(questionNumber-1)}}>
            <p className="menuLevel__question">
                {questionNumber}) {question}
            </p>
            <div className="menuLevel__payload">
                <p>Отгадано: {answers}/6</p>
                <p>Рублей: {money}/300</p>
            </div>

        </div>
    );
}
export default connect(null, (dispatch)=>({
    startGame: (level) => {
        dispatch(startGame(level));
    }
}))(MenuLevel);
