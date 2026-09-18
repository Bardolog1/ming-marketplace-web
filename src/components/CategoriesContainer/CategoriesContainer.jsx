import { useEffect, useState } from "react";
import styled from "styled-components";
import CategorieItem from "../CategorieItem/CategorieItem";

// Mismo umbral que NavBar.jsx usa para pasar a su estado "with-color"
// (fondo sólido) — así las categorías se anclan justo cuando el navbar
// también cambia, quedan sincronizados visualmente.
//
// Nota técnica: se evaluó react-scroll-parallax para el "slide + pin",
// pero las librerías de scroll-parallax miden la posición del elemento
// en la página a medida que se scrollea — un elemento position:fixed deja
// de moverse con el scroll, así que su progreso se congela apenas se fija
// (lo confirmamos en vivo: quedaba pegado en opacity:0.4 para siempre).
// El slide-in en el momento exacto del anclaje se resuelve mejor con una
// transición CSS de transform/opacity atada al propio cambio de estado.
const PIN_SCROLL = 500;
const NAVBAR_HEIGHT = 64;

const Spacer = styled.div`
  height: ${(props) => (props.$active ? "70px" : "0px")};
`;

const Bar = styled.div`
  width: 100%;
  box-sizing: border-box;
  transform: translateX(0);
  opacity: 1;
  transition: background-color 0.2s ease, box-shadow 0.2s ease,
    transform 0.25s ease-out, opacity 0.25s ease-out;

  &.pinned {
    position: fixed;
    top: ${NAVBAR_HEIGHT}px;
    left: 0;
    right: 0;
    z-index: 900;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border-subtle);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  /* Línea de marca (violeta -> verde) pegada al navbar, mismo lenguaje
     que el borde de foco del buscador — ancla visualmente la barra al
     resto de la identidad en vez de sentirse una toolbar genérica pegada. */
  &.pinned::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  }

  /* Estado de entrada: arranca corrido y transparente, la transición de
     arriba lo lleva a transform/opacity finales apenas se saca la clase. */
  &.entering {
    transform: translateX(-48px);
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 8px;
  box-sizing: border-box;

  .pinned & {
    padding: 14px 24px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-bottom: 16px;

  .pinned & {
    display: none;
  }
`;

const Strip = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    flex-wrap: wrap;
    overflow-x: visible;
    padding-bottom: 0;
  }

  /* Ancladas: una sola fila con scroll (patrón estándar de filtro pineado),
     pero sin el rastro de scrollbar nativo. padding: 3px arriba/abajo —
     overflow-x:auto también clipea el eje Y sin ese margen, así que el
     anillo de selección (box-shadow de 2px) quedaba cortado. */
  .pinned & {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 3px 0;
  }
`;

const StripMask = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 32px;
    background: linear-gradient(to right, transparent, var(--color-surface));
    pointer-events: none;
    opacity: 0;
  }

  .pinned & {
    &::after {
      opacity: 1;
    }
  }

  @media (min-width: 900px) {
    &::after {
      display: none;
    }
  }
`;

// 14 unique categories, deduplicated by title (the source data previously
// repeated Books, Toys, Sports, Tools, Cars, Music, Movies and Garden, some
// reusing the same id).
const categories = [
  { id: 1, title: "Clothes", url: "/clothes", icon: "fa-solid fa-shirt" },
  { id: 2, title: "Shoes", url: "/shoes", icon: "fa-solid fa-shoe-prints" },
  { id: 3, title: "Accessories", url: "/accessories", icon: "fa-solid fa-glasses" },
  { id: 4, title: "Electronics", url: "/electronics", icon: "fa-solid fa-mobile-alt" },
  { id: 5, title: "Home", url: "/home", icon: "fa-solid fa-home" },
  { id: 6, title: "Books", url: "/books", icon: "fa-solid fa-book" },
  { id: 7, title: "Toys", url: "/toys", icon: "fa-solid fa-baby" },
  { id: 8, title: "Sports", url: "/sports", icon: "fa-regular fa-futbol" },
  { id: 9, title: "Tools", url: "/tools", icon: "fa-solid fa-tools" },
  { id: 10, title: "Cars", url: "/cars", icon: "fa-solid fa-car" },
  { id: 11, title: "Music", url: "/music", icon: "fa-solid fa-music" },
  { id: 12, title: "Movies", url: "/movies", icon: "fa-solid fa-film" },
  { id: 13, title: "Garden", url: "/garden", icon: "fa-solid fa-seedling" },
  { id: 14, title: "Pets", url: "/pets", icon: "fa-solid fa-paw" },
];

const CategoriesContainer = ({ selectedCategory, onSelectCategory, ...props }) => {
  const [pinned, setPinned] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    let wasPinned = false;
    const onScroll = () => {
      const shouldPin = window.scrollY >= PIN_SCROLL;
      if (shouldPin && !wasPinned) {
        // Arranca en el estado "entering" (corrido + transparente) un
        // frame antes de aplicar la clase final, para que la transición
        // CSS realmente anime el slide-in en vez de aparecer de golpe.
        setEntering(true);
        requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
      }
      wasPinned = shouldPin;
      setPinned(shouldPin);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reserva el alto cuando la barra pasa a fixed, para que el grid de
          productos no salte hacia arriba al perder el elemento del flujo. */}
      <Spacer $active={pinned} />
      <Bar className={`${pinned ? "pinned" : ""} ${entering ? "entering" : ""}`} {...props}>
        <Inner>
          <Title>Categorías</Title>
          <StripMask>
            <Strip>
              <CategorieItem
                title="Todas"
                compact={pinned}
                selected={selectedCategory == null}
                onSelect={() => onSelectCategory?.(null)}
              />
              {categories.map((category) => {
                const slug = category.url.replace("/", "");
                return (
                  <CategorieItem
                    key={category.id}
                    icon={category.icon}
                    title={category.title}
                    slug={slug}
                    compact={pinned}
                    featured={category.featured}
                    selected={selectedCategory === slug}
                    onSelect={onSelectCategory}
                  />
                );
              })}
            </Strip>
          </StripMask>
        </Inner>
      </Bar>
    </>
  );
};

export default CategoriesContainer;
