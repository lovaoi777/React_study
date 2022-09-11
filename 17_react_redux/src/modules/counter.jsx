import { createAction, handleActions } from 'redux-actions';

//1. 액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//2. 액션 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//3. 초기 상태 및 리듀서 만들기
const initialState = {
  number: 0,
};

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
