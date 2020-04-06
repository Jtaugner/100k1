import React from 'react';
import './game.css'
import TopMenu from "../topMenu";
import BackMenu from "../backMenu/";
import {connect} from "react-redux";
import Money from "../money";
import Tips from "../tips";
import {moneyPerAnswer} from "../common";
function Game(props) {
    const {question, answers, doneAnswers} = props;
    return (
        <div className={'game'}>
            <TopMenu>
                <BackMenu/>
                <Money />
                <Tips/>
            </TopMenu>
            {/*
            <div className="game__question">{question}</div>
            <div className="answers">
                {
                    answers.map((answer, index)=>{
                        return <div className={'answers__answer'}>
                            <p>{doneAnswers[index] === 1 ? answer : ''} </p>
                            <p>{moneyPerAnswer[index]} ₽</p>
                        </div>
                    })
                }
            </div>
            <input type="text" className="giveAnswer"/> */}
        </div>


    );
}
export default connect()(Game);
