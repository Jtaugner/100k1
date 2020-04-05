import {ADD_RIGHT_ANSWER, BUY_LEVEL} from "../common";


let doneDirectLevels = localStorage.getItem('doneDirectLevels');
if(doneDirectLevels) doneDirectLevels = JSON.parse(doneDirectLevels);
else {
    doneDirectLevels = getFirstLevels(3000);
}
function getFirstLevels(length){
    let newLevels = [];
    for(let i = 0; i < length; i++){
        newLevels.push([
            0,
            [0,0,0,0,0,0]
        ])
    }
    for(let i = 0; i < 10; i++){
        newLevels[i][0] = 1;
    }
    return newLevels
}


let doneReverseLevels = localStorage.getItem('doneReverseLevels');
if(doneReverseLevels) doneReverseLevels = JSON.parse(doneReverseLevels);
else {
    doneReverseLevels = getFirstLevels(3000);
}

//Структура уровня
// Array [2]
// Array[0] = 0 - если уровень закрыт; 1 - если открыт
// Array[1] = Array2 [6]
// Array2[0-6], 0 - если ответ дан, 1 - если нет.

function changeDoneLevels(stateDoneLevels, action) {
    if (action.type === BUY_LEVEL) {
        stateDoneLevels[action.payload.level][0] = 1;
    } else if (action.type === ADD_RIGHT_ANSWER) {
        stateDoneLevels
            [action.payload.level][1][action.payload.answer] = 1;
    }
    localStorage.setItem('doneDirectLevels', stateDoneLevels);
    return [...stateDoneLevels];
}




export const doneDirectLevelsReducer =
    (stateDoneLevels = doneDirectLevels, action) => {
    if(action.payload && action.payload.isDirect){
        return changeDoneLevels(stateDoneLevels, action);
    }
    return stateDoneLevels
};


export const doneReverseLevelsReducer =
    (stateDoneLevels = doneReverseLevels, action) => {
        if(action.payload && !action.payload.isDirect){
            return changeDoneLevels(stateDoneLevels, action);
        }
        return stateDoneLevels
    };