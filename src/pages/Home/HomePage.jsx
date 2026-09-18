import { useState } from 'react';
import BannerSearcher from '../../components/BannerSearcher/BannerSearcher';
import BestProductsCarousel from '../../components/BestProductsCarousel/BestProductsCarousel';
import CategoriesContainer from '../../components/CategoriesContainer/CategoriesContainer';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <BannerSearcher />
      <BestProductsCarousel />
      <CategoriesContainer
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductsContainer category={selectedCategory} />
    </>
  );
};

export default HomePage;
