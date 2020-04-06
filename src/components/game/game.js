import React, {useState} from 'react';
import './game.css'
import TopMenu from "../topMenu";
import BackMenu from "../backMenu/";
import {connect} from "react-redux";
import Money from "../money";
import Tips from "../tips";
import {moneyPerAnswer} from "../common";
import {selectDoneDirectLevels, selectDoneReverseLevels, selectIsDirectOrder, selectLevel} from "../../store/selectors";
import {reverseQuestions, directQuestions} from "../../questions";
import {addRightAnswer} from "../../store/ac";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

//Проверка правильности ответа

function normalizeSentence(sentence) {
    let lowerSentece = sentence.toLowerCase();
    return lowerSentece.replace(/[^A-Za-zА-Яа-я0-9 ]/g, '');
}

let subtokenLength = 1;
let thresholdWord = 0.5;

function isTokensFuzzyEqual(firstToken, secondToken) {
    let equalSubtokensCount = 0;
    let usedTokens = [];
    for (let i = 0; i < firstToken.length - subtokenLength + 1; ++i) {
        let subtokenFirst = firstToken.substr(i, subtokenLength);
        for (let j = 0; j < secondToken.length - subtokenLength + 1; ++j) {
            if (!usedTokens[j]) {
                let subtokenSecond = secondToken.substr(j, subtokenLength);
                if (subtokenFirst === subtokenSecond) {
                    equalSubtokensCount++;
                    usedTokens[j] = true;
                    break;
                }
            }
        }
    }

    let subtokenFirstCount = firstToken.length - subtokenLength + 1;
    let subtokenSecondCount = secondToken.length - subtokenLength + 1;

    let tanimoto = (equalSubtokensCount) / (subtokenFirstCount + subtokenSecondCount - equalSubtokensCount);
    return thresholdWord <= tanimoto;
}

function getFuzzyEqualsTokens(tokensFirst, tokensSecond) {
    let equalsTokens = [];
    let usedToken = [];
    for (let i = 0; i < tokensFirst.length; ++i) {
        for (let j = 0; j < tokensSecond.length; ++j) {
            if (!usedToken[j]) {
                if (isTokensFuzzyEqual(tokensFirst[i], tokensSecond[j])) {
                    equalsTokens.push(tokensFirst[i]);
                    usedToken[j] = true;
                    break;
                }
            }
        }
    }

    return equalsTokens;
}

function calculateFuzzyEqualValue(first, second) {
    if ((!first && !second) || first === second) {
        return 1;
    }
    if (!first || !second) {
        return 0;
    }
    let normalizedFirst = normalizeSentence(first);
    let normalizedSecond = normalizeSentence(second);
    let fuzzyEqualsTokens = getFuzzyEqualsTokens(normalizedFirst, normalizedSecond);

    let equalsCount = fuzzyEqualsTokens.length;
    let firstCount = normalizedFirst.length;
    let secondCount = normalizedSecond.length;

    let resultValue = (equalsCount) / (firstCount + secondCount - equalsCount);

    return resultValue;
}

function Game(props) {
    const {question, isDirect, answers, doneAnswers, level, addRightAnswer} = props;
    const [answer, setAnswer] = useState('');
    const handleInputAnswer = (e) => {
        e.preventDefault();
        setAnswer(e.target.value);
    };
    const testAnswer = (e) => {
        e.preventDefault();
        for (let i = 0; i < answers.length; i++) {
            let coef = calculateFuzzyEqualValue(answer, answers[i]);
            if (coef > 0.5) {
                addRightAnswer(level, i);
                setAnswer('');
                break;
            }
        }

    };
    return (
        <div className={'game'}>
            <TopMenu>
                <BackMenu/>
                <Money/>
                <Tips/>
            </TopMenu>
            <div className="game__question">{question}</div>


                    <div className="answers">

                        {
                            answers.map((answer, index) => {
                                return <div
                                    key={isDirect + '' + level + '' + index}
                                    className={'answers__answer'}
                                >
                                    <SwitchTransition>
                                        <CSSTransition
                                            key={doneAnswers[index] === 1}
                                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                                            classNames={'fade'}
                                        >
                                    {doneAnswers[index] === 1 ? <p>{answer}</p> : <p />}
                                    </CSSTransition>
                                    </SwitchTransition>


                                    <p className="answer__money">{moneyPerAnswer[index]} ₽</p>
                                </div>

                            })
                        }

                    </div>


            <form onSubmit={testAnswer}>
                <input type="text" className="giveAnswer"
                       value={answer}
                       onChange={handleInputAnswer}

                       placeholder={'Ваш ответ'}/>
            </form>

        </div>


    );
}

export default connect((store) => {
        let isDirect = selectIsDirectOrder(store);
        let level = selectLevel(store);
        console.log(selectDoneDirectLevels(store));
        let doneAnswers = isDirect ? selectDoneDirectLevels(store)[level][1] :
            selectDoneReverseLevels(store)[level][1];
        return {
            question: isDirect ? directQuestions[level][0] : reverseQuestions[level][0],
            answers: isDirect ? directQuestions[level][1] : reverseQuestions[level][1],
            doneAnswers, level, isDirect
        }

    },
    (dispatch) => ({
        addRightAnswer: (level, answer) => {
            dispatch(addRightAnswer(level, answer))
        }
    })
)(Game);
