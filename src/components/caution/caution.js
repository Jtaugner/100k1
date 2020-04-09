import React from 'react';
import './caution.scss'

function Caution(props) {
    const {text, close} = props;
    return (
        <>
            <div className="cautionBlackout" onClick={close} />
            <div className="caution">
                <p>{text}</p>
                <button className="closeCaution"
                onClick={close}
                >Хорошо</button>
            </div>
        </>

    );
}

export default Caution;
