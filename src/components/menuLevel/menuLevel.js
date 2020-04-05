import React from 'react';
import './menuLevel.css'
const classNames = require('classnames');
function MenuLevel(props) {
    const {questionNumber, question, answers, money, isLevelClosed} = props;
    const menuLevelClasses = classNames({
        'menuLevel': true,
        'levelClosed': isLevelClosed
    });
    return (
        <div className={menuLevelClasses}>
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
export default MenuLevel;
