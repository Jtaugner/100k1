import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    selectDoneDirectLevels,
    selectDoneReverseLevels,
    selectIsDirectOrder
} from "../../store/selectors";
import TopMenu from "../topMenu";
import Rules from "../rules";
import './menu.css'
import MenuLevel from "../menuLevel";
import {changeOrder, startGame} from "../../store/ac";
import InfiniteScroll from "react-infinite-scroll-component";
import Money from "../money";
import {moneyPerAnswer} from "../common";

function countMoneyByAnswers(answers) {
    let money = 0;

    answers.forEach((ans, ind) => {
        if(ans) money += moneyPerAnswer[ind];
    });

    return money;
}
let ADD_LEVELS = 40;
function Menu(props) {
    const {doneLevels, isDirectOrder, changeOrder, startGame,
        questions
    } = props;
    const [isRules, setIsRules] = useState(false);
    const [levelsLength, setLevelsLength] = useState(ADD_LEVELS);
    const [menuLevels, setMenuLevels] = useState(questions.slice(0, ADD_LEVELS));
    useEffect(() => {
        setMenuLevels(questions.slice(0, ADD_LEVELS))
    }, [questions]);
    const addLevels = () => {
        setMenuLevels(questions.slice(0, levelsLength + ADD_LEVELS));
        setLevelsLength(levelsLength + ADD_LEVELS);
    };
    return (
        <div className="menu">
            <TopMenu>
                <p className={'rulesButton'}
                    onClick={() => {
                        setIsRules(!isRules)
                    }}> ? </p>
                <p className={'topMenu__mid'}>
                    {0}/{questions.length}</p>
                <Money />
            </TopMenu>
            <div className="menu_chooseOrder">
                <p
                    onClick={() => {changeOrder(true)}}
                    className={isDirectOrder ? 'menu_chooseOrder_active' : ''}>Прямая</p>
                <p
                    onClick={() => {changeOrder(false)}}
                    className={!isDirectOrder ? 'menu_chooseOrder_active' : ''}>Обратная</p>
            </div>
            <InfiniteScroll
            dataLength={menuLevels.length}
            next={addLevels}
            hasMore={levelsLength < questions.length}
            loader={<h4>Загрузка...</h4>}
            >
                {
                    menuLevels.map((arr, index) => {
                        return <MenuLevel
                                isLevelClosed={doneLevels[index][0] === 0}
                                key={'ml' + isDirectOrder + index}
                                questionNumber={index + 1}
                                question={arr[0]}
                                answers={doneLevels[index][1].reduce((acc, n) => acc + n, 0)}
                                money={countMoneyByAnswers(doneLevels[index][1])}/>

                    })
                }
            </InfiniteScroll>



            {isRules && <Rules/>}
        </div>
    );
}

export default connect(
    (store, ownProps) => {
        let isDirectOrder = selectIsDirectOrder(store);
        let doneLevels = isDirectOrder ? selectDoneDirectLevels(store) :
            selectDoneReverseLevels(store);
        let questions = isDirectOrder ? ownProps.directQuestions : ownProps.reverseQuestions
        return {
           isDirectOrder,
            doneLevels, questions

        }
    },
    (disptach) => ({
        changeOrder: (isDirect) => {
            disptach(changeOrder(isDirect));
        },
        startGame: (level) => {
            disptach(startGame(level));
        }
    })

)
(Menu);
