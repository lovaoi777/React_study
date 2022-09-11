import{Route, Routes} from 'react-router-dom'
import About from './Page/About';
import Article from './Page/Article';
import Articles from './Page/Articles';
import Home from './Page/Home';
import Layout from './Page/Layout';
import NotFound from './Page/NotFound';
import Profile from './Page/Profile';
import Mypage from './Page/Mypage';
import Login from './Page/Login';
function App() {
  return (
    <Routes>
      <Route element={<Layout />} >     
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile/:username" element={<Profile />} />
      </Route>

      <Route path="/articles" element={<Articles />} >
        <Route path=":id" element={<Article />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/myPage" element={<myPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
