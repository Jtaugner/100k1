import React from 'react';
import './tips.css'
import {selectShowAdv} from "../../store/selectors";
import {connect} from "react-redux";
import {showTipAdv} from "../../store/ac";

function Tips(props) {
    const {tipsAmount, canShowAdv, showTipAdv} = props;

    return (
        <div className="tips" onClick={props.onClick}>
            {
                tipsAmount === 0 && canShowAdv
                    ?
                    <div className={'tips_adv'} onClick={showTipAdv} />
                    :
                    <div className="tips_amount">
                        {tipsAmount}
                    </div>
            }

        </div>
    );
}
export default connect((store)=>({
    canShowAdv: selectShowAdv(store)
}),
    (dispatch) => ({
        showTipAdv: () => dispatch(showTipAdv())
    })
)(Tips);
