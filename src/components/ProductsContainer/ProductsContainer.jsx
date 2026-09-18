import React from "react";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";

// Placeholder data: DataProviders/GetAllProducts.jsx points at a dead local
// endpoint (no backend exists in this repo yet). Using a small mock dataset
// here so the Home page has a real-looking product grid until there's an
// actual API to wire up.
const mockProducts = [
  {
    id: 1,
    productName: "Auriculares inalámbricos",
    unitPrice: 59.99,
    nameImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "electronics",
  },
  {
    id: 2,
    productName: "Zapatillas urbanas",
    unitPrice: 79.5,
    nameImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "shoes",
  },
  {
    id: 3,
    productName: "Mochila de viaje",
    unitPrice: 45.0,
    originalPrice: 60.0,
    nameImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "accessories",
  },
  {
    id: 4,
    productName: "Reloj clásico",
    unitPrice: 129.99,
    nameImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    category: "accessories",
  },
  {
    id: 5,
    productName: "Planta de interior",
    unitPrice: 18.25,
    nameImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    category: "garden",
  },
  {
    id: 6,
    productName: "Lámpara de escritorio",
    unitPrice: 34.9,
    nameImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    category: "home",
  },
  {
    id: 7,
    productName: "Libro de diseño",
    unitPrice: 22.0,
    nameImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    category: "books",
  },
  {
    id: 8,
    productName: "Taza de cerámica",
    unitPrice: 12.5,
    nameImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    category: "home",
  },
];

const Section = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px 48px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 64px 24px;
  color: var(--color-foreground-muted);
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 10%, var(--color-surface));
  color: var(--color-primary);
  font-size: 1.75rem;
`;

const EmptyTitle = styled.p`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-foreground);
`;

const ProductsContainer = ({ category }) => {
  const filtered = category
    ? mockProducts.filter((product) => product.category === category)
    : mockProducts;

  return (
    <Section>
      <Title>
        {category
          ? `Productos en ${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : "Productos destacados"}
      </Title>
      {filtered.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <i className="fa-solid fa-box-open" aria-hidden="true" />
          </EmptyIcon>
          <EmptyTitle>Todavía no hay productos acá</EmptyTitle>
          <p>Esta categoría está vacía por ahora — volvé a "Todas" o probá otra.</p>
        </EmptyState>
      ) : (
        <Grid>
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              productName={product.productName}
              unitPrice={product.unitPrice}
              originalPrice={product.originalPrice}
              nameImage={product.nameImage}
              featured={!category && index === 0}
            />
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default ProductsContainer;
