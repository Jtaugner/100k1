import React from 'react';
import {selectMoney} from "../../store/selectors";
import {connect} from "react-redux";
function Money(props) {
    const {money} = props;
    return (
        <p>{money} ₽</p>
    );
}
export default connect(
    (store) => ({
        money: selectMoney(store)
    })
)(Money);
