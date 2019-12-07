import React, { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case 'NUMBER_INCREMENT':
      return state + 1;
    case 'NUMBER_DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'NUMBER_INCREMENT' });
  }

  const onDecrease = () => {
    dispatch({ type: 'NUMBER_DECREMENT' });
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}


export default Counter;