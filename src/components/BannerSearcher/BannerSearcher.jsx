import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

// Signature hero: a two-tone "split identity" moment. Ming is an intermediary
// marketplace, not a seller — the left (violet) side speaks to buyers, the
// right (green) side speaks to sellers, and the search bar sits on the seam
// where both meet.
const Hero = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 420px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 0;
  }
`;

const Side = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 48px;
  color: var(--gray-0);
`;

const BuyerSide = styled(Side)`
  background: linear-gradient(135deg, var(--violet-700), var(--violet-500));
  align-items: flex-end;
  text-align: right;
  clip-path: polygon(0 0, 100% 0, 86% 100%, 0% 100%);
  padding-right: 26%;

  @media (max-width: 768px) {
    clip-path: none;
    align-items: center;
    text-align: center;
    padding: 40px 24px 56px;
  }
`;

const SellerSide = styled(Side)`
  background: linear-gradient(135deg, var(--green-600), var(--green-400));
  align-items: flex-start;
  text-align: left;
  margin-left: -14%;
  clip-path: polygon(14% 0, 100% 0, 100% 100%, 0% 100%);
  padding-left: 26%;
  order: 2;

  @media (max-width: 768px) {
    margin-left: 0;
    clip-path: none;
    align-items: center;
    text-align: center;
    padding: 40px 24px 40px;
  }
`;

const Eyebrow = styled.p`
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gray-0);
  opacity: 0.85;
  margin-bottom: 8px;
`;

const Headline = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--gray-0);
  margin-bottom: 12px;
  max-width: 320px;
`;

const Sub = styled.p`
  font-size: 1rem;
  max-width: 320px;
  color: var(--gray-0);
  opacity: 0.92;
`;

const SearchDock = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(360px, 80%);
  z-index: 2;

  @media (max-width: 768px) {
    position: static;
    order: 1;
    transform: none;
    width: 100%;
    padding: 20px 24px;
    background: var(--color-surface);
  }
`;

const styles = {
  searchBar: {
    width: "100%",
  },
};

const BannerSearcher = () => {
  return (
    <Hero>
      <BuyerSide>
        <Eyebrow>Para compradores</Eyebrow>
        <Headline>Miles de productos, un solo lugar</Headline>
        <Sub>Encuentra lo que buscas entre cientos de vendedores en Ming.</Sub>
      </BuyerSide>
      <SearchDock>
        <SearchBar navScroll={true} style={styles.searchBar} />
      </SearchDock>
      <SellerSide>
        <Eyebrow>Para vendedores</Eyebrow>
        <Headline>Vendé lo tuyo, llegá a más gente</Headline>
        <Sub>Ming conecta tu negocio con compradores listos para comprar.</Sub>
      </SellerSide>
    </Hero>
  );
};

export default BannerSearcher;
