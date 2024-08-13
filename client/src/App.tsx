import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ContactFormPage from './pages/ContactFormPage';
import ContactDetailsPage from './pages/ContactDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import './styles/Navbar.css';

const App: React.FC = () => {

  return (
    <>
      <Router>
      <div className="App">
        <Navbar />
        <h1 className='title'>Take Home App</h1>
        <Routes>
          <Route 
              path = '/' 
              element = {<ContactFormPage />}
            />
          <Route
            path = "/contacts"
            element = {<ContactDetailsPage/>}
          />
          <Route 
            path = '*' 
            element = {<NotFoundPage/>}
          />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
