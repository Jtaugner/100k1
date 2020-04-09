import React from 'react';
import {connect} from "react-redux";
import {
    selectCaution,
    selectDoneDirectLevels,
    selectDoneReverseLevels,
    selectIsDirectOrder, selectIsGame, selectIsRules, selectIsSounds, selectLevel
} from "../../store/selectors";
import TopMenu from "../topMenu";
import Rules from "../rules";
import './menu.css'
import MenuLevel from "../menuLevel";
import {changeOrder, changeSounds, closeCaution, closeRules, noneLevel, openRules, startGame} from "../../store/ac";
import List from 'react-virtualized/dist/commonjs/List';
import Money from "../money";
import {moneyPerAnswer} from "../common";
import Sounds from "../sounds";
import Caution from "../caution";


function countMoneyByAnswers(answers) {
    let money = 0;

    answers.forEach((ans, ind) => {
        if(ans) money += moneyPerAnswer[ind];
    });

    return money;
}
function Menu(props) {
    const {doneLevels, isDirectOrder, changeOrder,
        questions, isSounds, changeSounds,
        isCaution, closeCaution, level, isRules, openRules, closeRules
    } = props;
    const orderChange = (direct) => {
        if(direct === isDirectOrder) return;
        changeOrder(direct);
    };


    const MenuLevelRow = ({index, key, style}) => {
        return (<MenuLevel
            isLevelClosed={doneLevels[index][0] === 0}
            key={key}
            style={style}
            questionNumber={index + 1}
            question={questions[index][0]}
            answers={doneLevels[index][1].reduce((acc, n) => acc + n, 0)}
            money={countMoneyByAnswers(doneLevels[index][1])}/>)
    };

    let scrollTo = level === -1 ? 0 : level + 3;
    if(scrollTo >= questions.length) scrollTo = questions.length - 1;
    return (
        <div className="menu">
            <div className="menu_chooseOrder">
                <p
                    onClick={() => {orderChange(true)}}
                    className={isDirectOrder ? 'menu_chooseOrder_active' : ''}>Прямая</p>
                <p
                    onClick={() => {orderChange(false)}}
                    className={!isDirectOrder ? 'menu_chooseOrder_active' : ''}>Обратная</p>
            </div>
            <List
                style={{outline: 'none'}}
                scrollToIndex={scrollTo}
                height={window.innerHeight}
                rowCount={questions.length}
                rowHeight={110}
                rowRenderer={MenuLevelRow}
                width={window.innerWidth > 600 ? 600 : window.innerWidth - 40}
            />




            <TopMenu>
                <p className={'rulesButton'}
                   onClick={openRules}> ? </p>
                <Money/>
                <Sounds isSounds={isSounds} onClick={changeSounds}/>

            </TopMenu>

            {
                isCaution ? <Caution text={'Чтобы открыть уровень, нужно 100 монет. Заработайте их, отвечая на вопросы!'} close={closeCaution}/> : ''
            }



            {isRules && <Rules closeRules={closeRules}/>}
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
            doneLevels, questions,
            isSounds: selectIsSounds(store),
            isCaution: selectCaution(store),
            level: selectLevel(store),
            isGame: selectIsGame(store),
            isRules: selectIsRules(store)

        }
    },
    (disptach) => ({
        changeOrder: (isDirect) => {
            disptach(changeOrder(isDirect));
        },
        startGame: (level) => {
            disptach(startGame(level));
        },
        changeSounds: () => disptach(changeSounds()),
        closeCaution: () => disptach(closeCaution()),
        noneLevel: () => disptach(noneLevel()),
        closeRules: () => disptach(closeRules()),
        openRules: () => disptach(openRules())

    })

)
(Menu);
