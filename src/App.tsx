import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { themes, colors } from './asstes/style/theme';
import './App.css';
import Home from 'page/Home';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import Library from 'page/Library';
import Setting from 'page/Setting';
import Statistics from 'page/Statistics';
import Menu from 'components/common/Menu';
import HomeSearch from 'page/HomeSearch';

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

  const onClickTheme = (themeName: keyof typeof themes) => {
    setCurrentTheme(themes[themeName]);
  };

  const myTheme = {
    colors,
    currentTheme
  };

  return (
    <ThemeProvider theme={myTheme}>
      <div className='App'>
        <Delete>
          <button onClick={() => onClickTheme('pink')}> pi</button>
          <button onClick={() => onClickTheme('green')}> gr</button>
          <button onClick={() => onClickTheme('blue')}> bl</button>
          <button onClick={() => onClickTheme('yellow')}> ye</button>
        </Delete>
        <Router basename={process.env.PUBLIC_URL}>
          <Menu />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/home/search' element={<HomeSearch />} />
            <Route path='/library' element={<Library />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/statistics' element={<Statistics />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
