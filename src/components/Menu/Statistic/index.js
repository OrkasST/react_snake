import React from 'react';
//import { Route } from 'react-router-dom';

const Statistic = ({ fields }) => {
    return (
        <div>
            {fields.map(field => <div>{field.name}</div>)}
        </div>
    )
}

export default Statistic;
