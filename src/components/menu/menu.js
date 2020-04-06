import React, {useState} from 'react';
import {connect} from "react-redux";
import {
    selectDoneDirectLevels,
    selectDoneReverseLevels,
    selectIsDirectOrder,
    selectMoney
} from "../../store/selectors";
import TopMenu from "../topMenu";
import OpenRules from "../openRules";
import Rules from "../rules";
import './menu.css'
import MenuLevel from "../menuLevel";
import {changeOrder} from "../../store/ac";
import InfiniteScroll from "react-infinite-scroll-component";


function countMoneyByAnswers(answers) {
    let money = 0;

    if(answers[1] === 1) money += 20;
    if(answers[2] === 1) money += 40;
    if(answers[3] === 1) money += 60;
    if(answers[4] === 1) money += 80;
    if(answers[5] === 1) money += 100;

    return money;
}
function Menu(props) {
    const {doneLevels, money, questions, isDirectOrder,
        changeOrder} = props;
    const [isRules, setIsRules] = useState(false);
    const [levelsLength, setLevelsLength] = useState(20);
    const [menuLevels, setMenuLevels] = useState(questions.slice(0, 20));
    const addLevels = () => {
        setMenuLevels(questions.slice(0, levelsLength + 20));
        setLevelsLength(levelsLength + 20);
    };
    return (
        <div className="menu">
            <TopMenu>
                <OpenRules
                    onClick={() => {
                        setIsRules(!isRules)
                    }}/>
                <p className={'topMenu__mid'}>
                    {0}/{questions.length}</p>
                <p>{money}₽</p>
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
                            key={'menuLevel' + index}
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
    (store) => {
        let isDirectOrder = selectIsDirectOrder(store);
        let doneLevels = isDirectOrder ? selectDoneDirectLevels(store) :
            selectDoneReverseLevels(store);
        console.log(doneLevels);
        return {
            money: selectMoney(store), isDirectOrder,
            doneLevels
        }
    },
    (disptach) => ({
        changeOrder: (isDirect) => {
            disptach(changeOrder(isDirect));
        }
    })

)
(Menu);
