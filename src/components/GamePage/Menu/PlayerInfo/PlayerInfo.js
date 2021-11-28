import React from 'react';
//import { Route } from 'react-router-dom';

const PlayerInfo = (props) => {
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
            {data}
        </div>
    )
}

export default PlayerInfo;