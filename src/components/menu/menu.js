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
    const {doneLevelsAmount, doneLevels, money, questions, isDirectOrder} = props;
    const [isRules, setIsRules] = useState(false);
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
                <p className={isDirectOrder ? 'menu_chooseOrder_active' : ''}>Прямая</p>
                <p className={!isDirectOrder ? 'menu_chooseOrder_active' : ''}>Обратная</p>
            </div>
            {
                questions.map((arr, index) => {
                    return <MenuLevel
                        isLevelClosed={doneLevels[index][0] === 0}
                        key={'menuLevel' + index}
                        questionNumber={index + 1}
                        question={arr[0]}
                        answers={doneLevels[index][1].reduce((acc, n) => acc + n, 0)}
                        money={countMoneyByAnswers(doneLevels[index][1])}/>
                })
            }


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
    }
)
(Menu);
