import React from 'react';
import '../styles/components.css';
import ListPage from './post/ListPage';

const MainPage = () => {
  return (
    <div>
      <div className="main-container">
        <div>
          <h1>메인페이지</h1>
          <section>JOIN US! Let's Happy Hacking!</section>
        </div>
        <ListPage />
      </div>
    </div>
  );
};

export default MainPage;
