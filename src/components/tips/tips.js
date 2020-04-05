import React from 'react';
import './tips.css'
function Tips(props) {
    const {tipsAmount} = props;
    return (
        <div className="tips">
            <div className="tips_amount">
                {tipsAmount}
            </div>
        </div>
    );
}
export default Tips;
