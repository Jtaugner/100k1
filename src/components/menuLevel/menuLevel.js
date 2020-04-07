import React from 'react';
import './menuLevel.css'
import {connect} from "react-redux";
import {buyLevel, startGame} from "../../store/ac";
import {selectMoney} from "../../store/selectors";
const classNames = require('classnames');
function MenuLevel(props) {
    const {questionNumber, question,
        answers, money, isLevelClosed, startGame,
        buyLevel} = props;
    const menuLevelClasses = classNames({
        'menuLevel': true,
        'levelClosed': isLevelClosed
    });
    return (
        <div className={menuLevelClasses} >
            <p className="menuLevel__question">
                {questionNumber}) {question}
            </p>
            <div className="menuLevel__payload">
                <p>Отгадано: {answers}/6</p>
                <p>Рублей: {money}/300</p>
            </div>
            {
                isLevelClosed ?
                    <div className={'openLevel buyLevel'} onClick={()=>{buyLevel(questionNumber-1)}} />
                    :
                <div className={'openLevel'} onClick={()=>{startGame(questionNumber-1)}} />
            }

        </div>
    );
}
export default connect(null, (dispatch)=>({
    startGame: (level) => {
        dispatch(startGame(level));
    },
    buyLevel: (level) => {
        dispatch(buyLevel(level));
    }
}))(MenuLevel);
