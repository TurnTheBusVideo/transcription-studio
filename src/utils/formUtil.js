import React from 'react';


export const renderOptions = (objs, value, display) => {
    const optionsComp = [
        <option key='empty-option' value=''>Please select</option>
    ];
    objs.forEach(obj => {
        optionsComp.push(<option key={obj[value]} value={obj[value]}>{obj[display]}</option>)
    }
    );
    return (<>
        {optionsComp}
    </>);
}

export const renderOptionsFromArray = (objs) => {
    const optionsComp = [
        <option key='empty-option' value=''>Please select</option>
    ];
    objs.forEach(obj => {
        optionsComp.push(<option key={obj} value={obj}>{obj}</option>)
    }
    );
    return (<>
        {optionsComp}
    </>);
}