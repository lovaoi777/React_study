import React from 'react';
import {Route} from  'react-router-dom';
import BluePage from './pages/BulePage'
import RedPage from './pages/RedPage';
import Menu from './components/Menu';
const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Route path = '/red' component={RedPage}/>
      <Route path = '/blue' component={BluePage} />      
    </div>
  );
};

export default App;