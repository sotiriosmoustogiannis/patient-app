import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>This page was not found.</p>
        <button onClick={handleHomeClick}>Go to Homepage</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
