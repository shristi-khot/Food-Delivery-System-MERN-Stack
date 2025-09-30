import React, { useState } from 'react';
import Header from '../../components/Navbar/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <div id="explore-menu">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodDisplay category={category} />
      <div id="app-download">
        <AppDownload />
      </div>
      <footer id="footer">
        {/* Add your footer content here or import a Footer component */}
        <p style={{ textAlign: 'center', padding: '20px' }}>© 2025 Delivora. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
