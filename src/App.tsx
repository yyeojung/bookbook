import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { theme } from './asstes/style/theme';
import './App.css';
import Home from 'page/Home';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
