import React, {useEffect, useState} from 'react';
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
import InfiniteScroll from "react-infinite-scroll-component";
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
let ADD_LEVELS = 40;
function Menu(props) {
    const {doneLevels, isDirectOrder, changeOrder,
        questions, isSounds, changeSounds,
        isCaution, closeCaution, level, noneLevel,
        isGame, isRules, openRules, closeRules
    } = props;

    const [levelsLength, setLevelsLength]
        = useState(ADD_LEVELS);
    const [menuLevels, setMenuLevels] = useState(questions.slice(0, ADD_LEVELS));
    useEffect(() => {
        if(level !== -1 && !isGame) {

            let newLevel = level + ADD_LEVELS;
            let qLength = newLevel >= questions.length ?  questions.length - 1 : newLevel;
            setLevelsLength(qLength);
            setMenuLevels(questions.slice(0, qLength));
        }

    }, [level]);
    useEffect(() => {
        if(level === -1 && !isGame) setMenuLevels(questions.slice(0, ADD_LEVELS));
    }, [questions]);



    const addLevels = () => {
        setMenuLevels(questions.slice(0, levelsLength + ADD_LEVELS));
        setLevelsLength(levelsLength + ADD_LEVELS);
    };
    const orderChange = (direct) => {
        if(direct === isDirectOrder) return;
        changeOrder(direct);
    };

    //Пролистывании до уровня, на котором был
    useEffect(()=>{
        if(level !== -1 && levelsLength > level && !isGame){
            let menuLevel = document.querySelectorAll('.menuLevel');
            if(menuLevel) {
                let newLevel = (level - 2) > 0 ? (level - 2) : 0;
                if (menuLevel[newLevel]) {
                    let top = menuLevel[newLevel].getBoundingClientRect().y;
                    document.querySelector('html').scrollTo({
                        top: top
                    });
                    noneLevel();
                }
            }
        }
    }, [level, levelsLength]);




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
