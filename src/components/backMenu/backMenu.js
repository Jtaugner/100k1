import React from 'react';
import './backMenu.css'
import {connect} from "react-redux";
import {backMenu} from "../../store/ac";
function BackMenu(props) {
    const {backMenu} = props;
    return (
        <div className="backMenu" onClick={backMenu}/>
    );
}
export default connect(null, (dispatch) => ({
    backMenu: () => {
        dispatch(backMenu());
    }
}))(BackMenu);
