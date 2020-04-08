import React, {useState} from 'react';
import './game.css'
import TopMenu from "../topMenu";
import BackMenu from "../backMenu/";
import {connect} from "react-redux";
import Money from "../money";
import Tips from "../tips";
import {moneyPerAnswer} from "../common";
import {
    selectDoneDirectLevels,
    selectDoneReverseLevels,
    selectIsDirectOrder, selectIsSounds,
    selectLevel,
    selectTips
} from "../../store/selectors";
import {reverseQuestions, directQuestions} from "../../questions";
import {addRightAnswer, getLevelDone, getTip} from "../../store/ac";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {doneAnswerSound, badAnswerSound, wasAnswerSound, doneLevelSound} from "../../sounds";

//Проверка правильности ответа

function normalizeSentence(sentence) {
    let lowerSentece = sentence.toLowerCase();
    return lowerSentece.replace(/[^A-Za-zА-Яа-я0-9 ]/g, '');
}

let subtokenLength = 1;
let thresholdWord = 0.7;

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
function makeAnswerGood(answer) {
    return answer.toLocaleLowerCase()
        .replace(/(^для )|(^с )|(^из-за )/, '')
        .replace('ё', 'е')
        .trim()
}
function testAnswersDone(answers) {
    for(let i = 0; i < answers.length; i++) if(answers[i] === 0) return false;
    return true;
}
function getAnswersIndexes(answers) {
    let indexes = [];
    answers.forEach((el, ind) => {
        if(el === 0) indexes.push(ind);
    });
    return indexes;
}
function Game(props) {
    const {question, isDirect, answers, doneAnswers, level, addRightAnswer, tips,
        getLevelDone, getTip, isSounds} = props;
    const [answer, setAnswer] = useState('');
    const [doneAnswer, setDoneAnswer] = useState(-1);
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const handleInputAnswer = (e) => {
        e.preventDefault();
        setAnswer(e.target.value);
    };
    const setDoneAnswerAnimation = (ans) => {
        setDoneAnswer(ans);
        setTimeout(()=>{
            setDoneAnswer(-1);
        }, 400);
    };
    const setWrongAnswerAnimation = () => {
        setWrongAnswer(true);
        setTimeout(()=>{
            setWrongAnswer(false);
            setAnswer('');
        }, 400);
    };
    const testAnswer = (e) => {
        e.preventDefault();
        for (let i = 0; i < answers.length; i++) {
            let coef = calculateFuzzyEqualValue(makeAnswerGood(answer),
                makeAnswerGood(answers[i]));
            if (coef > 0.7) {
                if(doneAnswers[i] === 1){
                    setDoneAnswerAnimation(i);
                    if(isSounds) wasAnswerSound.play();
                }else{
                    doneAnswers[i] = 1;
                    addRightAnswer(level, i);
                    if(testAnswersDone(doneAnswers)) {
                        if(isSounds) doneLevelSound.play();
                        getLevelDone();
                    }else{
                        if(isSounds) doneAnswerSound.play();
                    }
                }
                setAnswer('');
                return;
            }
        }
        if(isSounds) badAnswerSound.play();
        setWrongAnswerAnimation();
    };
    const getTipClick = () => {
        if(tips >= 1){
            let indexes = getAnswersIndexes(doneAnswers);
            if(indexes.length > 0){
                getTip();
                let rand = indexes[Math.floor(Math.random() * indexes.length)];
                addRightAnswer(level, rand);
                if(isSounds) doneAnswerSound.play();

            }

        }

    };
    return (
        <div className={'game'}>
            <TopMenu>
                <BackMenu/>
                <Money/>
                <Tips tipsAmount={tips} onClick={getTipClick}/>
            </TopMenu>
            <div className="game__question">{question}</div>


                    <div className="answers">

                        {
                            answers.map((answer, index) => {
                                return <div
                                    key={isDirect + '' + level + '' + index}
                                    className={'answers__answer'
                                    + (doneAnswer === index ? ' doneAnswer' : '')}
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
                <input type="text" className={'giveAnswer' + (wrongAnswer ? ' wrongAnswer' : '')}
                       value={answer}
                       autoFocus={true}
                       onChange={handleInputAnswer}

                       placeholder={'Ваш ответ'}/>
            </form>

        </div>


    );
}

export default connect((store) => {
        let isDirect = selectIsDirectOrder(store);
        let level = selectLevel(store);
        let doneAnswers = isDirect ? selectDoneDirectLevels(store)[level][1] :
            selectDoneReverseLevels(store)[level][1];
        return {
            question: isDirect ? directQuestions[level][0] : reverseQuestions[level][0],
            answers: isDirect ? directQuestions[level][1] : reverseQuestions[level][1],
            doneAnswers, level, isDirect,
            tips: selectTips(store),
            isSounds: selectIsSounds(store)
        }

    },
    (dispatch) => ({
        addRightAnswer: (level, answer) => {
            dispatch(addRightAnswer(level, answer))
        },
        getLevelDone: () => {
            dispatch(getLevelDone());
        },
        getTip: () => {
            dispatch(getTip());
        }
    })
)(Game);
