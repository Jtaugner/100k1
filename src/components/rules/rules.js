import React from 'react';
import './rules.scss'
import {changeRules} from "../../store/ac";
import {connect} from "react-redux";

function Rules(props) {
    const {closeRules} = props;
    return (
        <>
            <div className="rulesBlackout" onClick={closeRules} />
            <div className="rules">
                <div className="closeRules" onClick={closeRules}/>
                <h3>Правила</h3>
                <p>Цель игры - угадать наиболее распространённые ответы
                    людей на предложенные вопросы, на которые нельзя дать однозначный ответ.</p>
                <p>К примеру, «Что любят есть французы?»
                    - ответы на этот вопрос бывают совершенно непредсказуемы и часто забавны.</p>
                <p>Попробуйте угадать все ответы!</p>
            </div>
        </>

    );
}

export default connect(null, (dispatch) => ({
    closeRules: () => {
        dispatch(changeRules());
    }
}))(Rules);
