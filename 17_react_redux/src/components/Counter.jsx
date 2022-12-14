import React from 'react';

const Counter = ({ number, onIncease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
