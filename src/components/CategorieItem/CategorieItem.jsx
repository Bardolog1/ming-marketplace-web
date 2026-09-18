import styled from "styled-components";

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid transparent;
  /* No usar --color-surface: la barra pineada tiene ese mismo fondo, así
     que un chip "surface sobre surface" se pierde y solo el borde de 1px
     lo distingue. Un tinte violeta clarito lo separa en ambos estados. */
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface));
  color: var(--color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  & i {
    font-size: 1rem;
    color: var(--color-primary);
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }

  /* Un par de categorías con más peso visual rompe la monotonía del strip
     y guía el ojo hacia las más buscadas — jerarquía, no decoración. */
  &.featured {
    border-color: transparent;
    background: var(--color-primary);
    color: var(--color-on-primary);
    font-weight: 700;
  }

  &.featured i {
    color: var(--color-on-primary);
  }

  &.featured:hover {
    background: var(--color-primary-hover);
    color: var(--color-on-primary);
  }

  /* Seleccionada (filtro activo) es un concepto distinto de "featured":
     anillo, no relleno — así no se confunde con "categoría promocionada". */
  &.selected {
    box-shadow: 0 0 0 2px var(--color-ring);
  }

  /* Ancladas debajo del navbar: barra utilitaria, no la sección hero de
     categorías — chips más chicos, sin competir por atención. */
  &.compact {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  &.compact i {
    font-size: 0.875rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const CategorieItem = ({ icon, title, slug, featured, selected, compact, onSelect }) => {
  const classes = [featured && "featured", selected && "selected", compact && "compact"]
    .filter(Boolean)
    .join(" ");

  return (
    <Chip
      type="button"
      className={classes}
      aria-pressed={selected}
      onClick={() => onSelect?.(slug)}
    >
      {icon && <i className={icon}></i>}
      <span>{title}</span>
    </Chip>
  );
};

export default CategorieItem;
