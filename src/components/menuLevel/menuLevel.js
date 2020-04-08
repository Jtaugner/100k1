import React from 'react';
import './menuLevel.css'
import {connect} from "react-redux";
import {buyLevel, showAdv, startGame} from "../../store/ac";
import {selectShowAdv} from "../../store/selectors";
const classNames = require('classnames');
function MenuLevel(props) {
    const {questionNumber, question,
        answers, money, isLevelClosed, startGame,
        buyLevel, canShowAdv, showAdv} = props;
    const menuLevelClasses = classNames({
        'menuLevel': true,
        'levelClosed': isLevelClosed
    });
    const startLevel = () => {
        if(canShowAdv){
            showAdv();
        }
        startGame(questionNumber-1)
    };
    return (
        <div className={menuLevelClasses} >
            <p className="menuLevel__question">
                {questionNumber}) {question}
            </p>
            <div className="menuLevel__payload">
                <p>Отгадано: {answers}/6</p>
                <p>Рублей: {money}/210</p>
            </div>
            {
                isLevelClosed ?
                    <div className={'openLevel buyLevel'} onClick={()=>{buyLevel(questionNumber-1)}} />
                    :
                <div className={'openLevel'} onClick={startLevel} />
            }

        </div>
    );
}
export default connect((store)=>({
    canShowAdv: selectShowAdv(store)
}), (dispatch)=>({
    startGame: (level) => {
        dispatch(startGame(level));
    },
    buyLevel: (level) => {
        dispatch(buyLevel(level));
    },
    showAdv: () => dispatch(showAdv())
}))(MenuLevel);
