import { Route, Routes, useLocation } from 'react-router-dom';
import { themes } from './assets/style/theme';
import './App.css';
import Home from 'page/Home';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import Library from 'page/Library';
import Setting from 'page/Setting';
import Statistics from 'page/Statistics';
import Menu from 'components/common/Menu';
import HomeSearch from 'page/HomeSearch';
import Styleguide from 'page/Styleguide';
import Login from './page/Login';
import HomeDetail from 'page/HomeDetail';
import HomeRegister from 'page/HomeRegister';

const Delete = styled.div`
  display: flex;
  position: fixed;
  bottom: 8rem;
  z-index: 1000;

  button {
    border: 2px solid red;
    font-size: 2rem;
  }
`;
function App() {
  const [currentTheme, setCurrentTheme] = useState(themes['pink']);
  const location = useLocation();

  const onClickTheme = (themeName: keyof typeof themes) => {
    setCurrentTheme(themes[themeName]);
  };

  // 메뉴 숨기는 화면
  const hidePath = ['/'];
  const isMenuHide = !hidePath.includes(location.pathname);

  return (
    <ThemeProvider theme={currentTheme}>
      <div className='App'>
        <Delete>
          <button onClick={() => onClickTheme('pink')}> pi</button>
          <button onClick={() => onClickTheme('green')}> gr</button>
          <button onClick={() => onClickTheme('blue')}> bl</button>
          <button onClick={() => onClickTheme('yellow')}> ye</button>
        </Delete>
        {isMenuHide && <Menu />}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/home/search' element={<HomeSearch />} />
          <Route path='/home/detail/:isbn' element={<HomeDetail />} />
          <Route path='/home/register/:isbn' element={<HomeRegister />} />
          <Route path='/library' element={<Library />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/' element={<Login />} />
          {/* styleguide */}
          <Route path='/styleguide' element={<Styleguide />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
