import styled from "styled-components";
import Logo from "../Logocomponent/Logo.jsx";

const Wrap = styled.footer`
  width: 100%;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-subtle);
  margin-top: 48px;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 24px 32px;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LogoWrap = styled.div`
  /* Logo (icono + texto "Ming") necesita un height explícito en algún
     ancestro para escalar bien — mismo motivo que en NavBar.css. */
  height: 32px;
  display: flex;
  align-items: center;
`;

const Tagline = styled.p`
  font-size: 0.875rem;
  color: var(--color-foreground-muted);
  max-width: 260px;
  line-height: 1.5;
`;

const Social = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-foreground-muted);
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColumnTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-foreground);
`;

const ColumnLink = styled.a`
  font-size: 0.875rem;
  color: var(--color-foreground-muted);
  text-decoration: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const Bottom = styled.div`
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Copy = styled.p`
  font-size: 0.8rem;
  color: var(--color-foreground-muted);
`;

// Sin páginas reales detrás todavía (Ayuda, Empresa, etc. no existen como
// rutas) — href="#" a propósito, es contenido de layout, no navegación real.
const columns = [
  {
    title: "Comprar",
    links: ["Cómo comprar", "Métodos de pago", "Seguimiento de pedidos", "Devoluciones"],
  },
  {
    title: "Vender",
    links: ["Empezar a vender", "Comisiones", "Centro de vendedores"],
  },
  {
    title: "Ayuda",
    links: ["Preguntas frecuentes", "Contacto", "Seguridad", "Términos y condiciones"],
  },
];

const socials = [
  { icon: "fa-brands fa-instagram", label: "Instagram" },
  { icon: "fa-brands fa-x-twitter", label: "X (Twitter)" },
  { icon: "fa-brands fa-tiktok", label: "TikTok" },
];

const Footer = () => {
  return (
    <Wrap>
      <Inner>
        <Top>
          <Brand>
            <LogoWrap>
              <Logo />
            </LogoWrap>
            <Tagline>
              El punto de encuentro entre miles de compradores y vendedores.
              Ming no vende: conecta.
            </Tagline>
            <Social>
              {socials.map((social) => (
                <SocialLink key={social.label} href="#" aria-label={social.label}>
                  <i className={social.icon} />
                </SocialLink>
              ))}
            </Social>
          </Brand>

          {columns.map((column) => (
            <Column key={column.title}>
              <ColumnTitle>{column.title}</ColumnTitle>
              {column.links.map((link) => (
                <ColumnLink key={link} href="#">
                  {link}
                </ColumnLink>
              ))}
            </Column>
          ))}
        </Top>

        <Bottom>
          <Copy>© {new Date().getFullYear()} Ming. Todos los derechos reservados.</Copy>
          <Copy>Hecho para conectar personas, no solo productos.</Copy>
        </Bottom>
      </Inner>
    </Wrap>
  );
};

export default Footer;
