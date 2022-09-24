import React from 'react';
import UsersContainer from '../containers/UsersContainer';
import UserContainer from '../containers/UserContainer';
import { Route,Routes } from 'react-router-dom';

const UsersPage = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<UsersContainer />} >
      <Route
        path="/users/:id" element={<UserContainer />}
      />
      </Route>
      </Routes>
    </>
  );
};

export default UsersPage;