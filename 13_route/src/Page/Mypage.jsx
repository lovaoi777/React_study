import React from "react";
import { Navigate } from "react-router-dom";
const Mypage = () => {
  const isLoggedIn = false;
  //isLoggedIn은 현재 false 고정값을 가지고 있지만, 이값이 로그인 상태에 따라 true또는 false를 가르킨다
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>마이페이지</div>;
};

export default Mypage;
