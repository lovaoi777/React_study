import React, { useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component'
// const SplitMe = React.lazy(() => import('./SplitMe'));
const SplitMe = loadable(() => import('./SplitMe'),{
  fallback : <div>loading...</div>
});

// import notify from './notify';

// function App() {
//   //저바스크립트 함수 비동기 로딩
//   // const onClick = () => {
//   //   import('./notify').then(result=>result.default());
//   // }import SplitMe from '../SplitMe';

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {/* <p onClick={onClick}>Hello React!</p> */}
//       </header>
//     </div>
//   );
// }



// State를 사용한  컴포넌트 스플리팅
// class App extends Component{
//   state = { 
//     SplitMe : null
//   };
//   handleClick = async () => { 
//     const loadaModule = await import ('./SplitMe');
//     this.setState({
//       SplitMe : loadaModule.default
//     });
//   };
//   render(){
//     const {SplitMe} = this.state;
//     return (
//       <div className='App'>
//         <header className='App-header'>
//           <img src={logo} className='App-logo' />
//           <p onClick={this.handleClick}>Hello React!</p>
//           {SplitMe && <SplitMe />}
//         </header>
//       </div>
//     )
//   }
// }


//React.lazy와 Suspense 사용하기


function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => { 
    setVisible(true);
  }
  const onMouseOver = () => { 
    SplitMe.preload();
  }
  return(
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
        {/* <Suspense fallback={<div>loading....</div>}>
        fallback 속성으로 넘긴 컴포넌트를 대신 보여줄 수 있다 */}
      
          {visible && <SplitMe />}
        {/* </Suspense> */}
      </header>
    </div>
  )
};

export default App;
