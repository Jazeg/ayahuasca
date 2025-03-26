//pages/homepage.tsx
import React from 'react';
import Carousel from '../components/Carousel';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      <Carousel />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
};

export default HomePage;