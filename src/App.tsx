import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from 'page/Home';
import { ThemeProvider } from 'styled-components';
import Library from 'page/Library';
import Setting from 'page/Setting';
import Statistics from 'page/Statistics';
import Menu from 'components/common/Menu';
import HomeSearch from 'page/HomeSearch';
import Styleguide from 'page/Styleguide';
import Login from './page/Login';
import HomeDetail from 'page/HomeDetail';
import HomeRegister from 'page/HomeRegister';
import LibraryBook from 'page/LibraryBook';
import { useThemeStore } from 'store/useThemeStore';

function App() {
  const { isThemeColor } = useThemeStore();
  const location = useLocation();

  // 메뉴 숨기는 화면
  const hidePath = ['/'];
  const isMenuHide = !hidePath.includes(location.pathname);

  return (
    <ThemeProvider theme={isThemeColor}>
      <div className='App'>
        {isMenuHide && <Menu />}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/home/search' element={<HomeSearch />} />
          <Route path='/home/detail/:isbn' element={<HomeDetail />} />
          <Route path='/home/register/:isbn' element={<HomeRegister />} />
          <Route path='/library' element={<Library />} />
          <Route path='/library/report/:bookId' element={<LibraryBook />} />
          <Route path='/home/edit/:bookId' element={<HomeRegister />} />
          <Route
            path='/statistics'
            element={<Statistics currentTheme={isThemeColor} />}
          />
          <Route path='/setting' element={<Setting />} />
          <Route path='/' element={<Login />} />
          {/* styleguide */}
          <Route path='/styleguide' element={<Styleguide />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
