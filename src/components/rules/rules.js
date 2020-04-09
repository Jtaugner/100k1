import React from 'react';
import './rules.scss'

function Rules(props) {
    const {closeRules} = props;
    return (
        <>
            <div className="rulesBlackout" onClick={closeRules} />
            <div className="rules">
                <div className="closeRules" onClick={closeRules}/>
                <h3 className={'rulesHeader'}>Правила</h3>
                <p>Цель игры - угадать наиболее распространённые ответы
                    людей на предложенные вопросы, которые не имеют однозначного ответа.</p>
                <p>В прямой версии игры нужно угадывать наиболее распространённые ответы, а в обратной версии - наиболее редкие.</p>
                <p>За каждый правильный ответ вам начисляется определённое количество денег, которые нужно использовать для открытия других уровней. <span className={'underline'}>Открытие уровня стоит 100.</span></p>
                <p>Если не можете угадать какой-то ответ - используйте подсказку. Их можно получить за полное прохождение уровней или за просмотр рекламы.</p>
                <p>Удачной игры!</p>
            </div>
        </>

    );
}

export default Rules;
