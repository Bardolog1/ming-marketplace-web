import { useRef } from "react";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";

// Curated "best" picks — separate from ProductsContainer's catalog mock
// since this is editorial/curated (a human choosing highlights), not a
// filtered view of the whole catalog. Same placeholder-data caveat: no
// real backend yet.
const bestProducts = [
  {
    id: "best-1",
    productName: "Auriculares inalámbricos",
    unitPrice: 59.99,
    nameImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  },
  {
    id: "best-2",
    productName: "Reloj clásico",
    unitPrice: 129.99,
    nameImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
  },
  {
    id: "best-3",
    productName: "Zapatillas urbanas",
    unitPrice: 79.5,
    nameImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    id: "best-4",
    productName: "Mochila de viaje",
    unitPrice: 45.0,
    nameImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  },
  {
    id: "best-5",
    productName: "Lámpara de escritorio",
    unitPrice: 34.9,
    nameImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
  },
];

const Section = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 8px;
  box-sizing: border-box;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-foreground);
`;

const Nav = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-foreground);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
`;

const Track = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 8px;
  scrollbar-width: thin;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 220px;
  scroll-snap-align: start;
`;

const BestProductsCarousel = () => {
  const trackRef = useRef(null);

  const scrollBy = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  return (
    <Section aria-label="Mejores productos">
      <Header>
        <Title>Mejores productos</Title>
        <Nav>
          <NavButton type="button" aria-label="Anterior" onClick={() => scrollBy(-1)}>
            <i className="fa-solid fa-chevron-left" />
          </NavButton>
          <NavButton type="button" aria-label="Siguiente" onClick={() => scrollBy(1)}>
            <i className="fa-solid fa-chevron-right" />
          </NavButton>
        </Nav>
      </Header>
      <Track ref={trackRef}>
        {bestProducts.map((product) => (
          <Slide key={product.id}>
            <ProductCard
              productName={product.productName}
              unitPrice={product.unitPrice}
              nameImage={product.nameImage}
            />
          </Slide>
        ))}
      </Track>
    </Section>
  );
};

export default BestProductsCarousel;
