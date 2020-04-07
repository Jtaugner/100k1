import React from 'react';
import './sounds.scss'
function Sounds(props) {
    const {isSounds} = props;
    return (
        <div onClick={props.onClick}
            className={'sounds' + (isSounds ? ' soundsOff' : '')} />
    );
}
export default Sounds;
