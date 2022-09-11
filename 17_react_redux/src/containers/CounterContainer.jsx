import React, { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';
// const CounterContainer = ({ number, increase, decrease }) => {
//   return <Counter number={number} onIncease={increase} onDecrease={decrease} />;
// };

// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   (dispatch) =>
//     bindActionCreators(
//       {
//         increase,
//         decrease,
//       },
//       dispatch,
//     ),
// )(CounterContainer);

//useSelector 상태 조회
const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
