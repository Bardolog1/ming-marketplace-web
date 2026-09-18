import React, { useEffect, useState } from 'react';
import Loading from "../ui/Loading/Loading";
import ProductCard from '../ProductCard/ProductCard';

const styles = {
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    margin: '50px',
  }
  
}

function GetAllProducts (){
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch('http://localhost:57679/api/products')
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      setDatos(data);
      });
  }, []);
  
  const products = datos?.map((product) => {
    return (
      <ProductCard style={styles.card} key={product.id} {...product} />
    )
  });
  
  

  return (
    <>
      
        <div style={styles.cardsContainer}>
        {!datos? <Loading/>: products} 
        
        </div>
      
    </>
  );
};

export default GetAllProducts;
