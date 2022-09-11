// import React from "react";
import { createAction, handleActions } from "redux-actions";

//액션 타입 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//액션 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//Thunk 생성 함수 만들기 (액션 함수 -> 일반 액션 객체로 반환대신 함수 반환)
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

//초기갑 설정
const initialState = 0; // 상태는 꼭 객체일 필요가 없다. 숫자도 작동한다

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
