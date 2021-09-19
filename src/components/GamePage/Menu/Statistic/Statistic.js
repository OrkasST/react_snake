import React from 'react';
//import { Route } from 'react-router-dom';

const Statistic = (props) => {
    let data = [];
    for (let name in props.state) {
      data.push(
        <div>
          {name}: {props.state[name]}
        </div>
      )
    }
    return (
        <div>
            Statistic
        </div>
    )
}

export default Statistic;
