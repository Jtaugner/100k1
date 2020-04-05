import React from 'react';
import './topMenu.css'
function TopMenu(props) {
    return (
        <div className="topMenu">
            {
                props.children
            }
        </div>
    );
}

export default TopMenu;
