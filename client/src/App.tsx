import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactDetailsPage from './pages/ContactDetailsPage/ContactDetailsPage';
import ContactFormPage from './pages/ContactFormPage/ContactFormPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navbar from './components/Navbar/Navbar';
import './App.scss'

const App: React.FC = () => {

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={<ContactFormPage />}
              />
              <Route
                path="/contacts"
                element={<ContactDetailsPage />}
              />
              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
