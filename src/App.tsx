import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Testimonials from './components/Testimonials';
import FeaturedProducts from './components/FeaturedProducts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          <Carousel />
          <FeaturedProducts />
          <Testimonials />
        </main>
      </div>
    </Router>
  );
}

export default App;