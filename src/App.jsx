import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Login from "./pages/Login/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  // No hay backend de autenticación todavía (ver auditoría de arquitectura):
  // esto solo deja la UI lista para cuando exista una sesión real.
  // Por ahora siempre arranca deslogueado.
  const isLoggedIn = false;

  const items = [
    // Sin link "Home": el logo ya lleva a "/" — tenerlo repetido en el nav
    // es ruido, ningún e-commerce real lo hace (Amazon, MercadoLibre, etc).
    // "Best Products" tampoco es nav/página: ahora es un carrusel dentro
    // del Home (ver BestProductsCarousel), entre el hero y las categorías.
    // "Offers" igual: ahora es el badge "Oferta" en ProductCard, no una
    // página propia sin contenido.
    {
      id: 4,
      title: "Cart",
      url: "/cart",
      icon: "fa-solid fa-shopping-cart",
      titleActive: "false",
      hasDropdown: false,
      // Placeholder: no hay estado de carrito real todavía (Cart.jsx es un
      // stub). 0 es honesto (carrito vacío) hasta que exista esa lógica.
      badge: 0,
    },
    // Una sola zona de cuenta: si no hay sesión, lleva a login/registro.
    // Si la hay, muestra el menú de perfil con cerrar sesión.
    isLoggedIn
      ? {
          id: 5,
          title: "Cuenta",
          icon: "fa-solid fa-circle-user",
          titleActive: "false",
          hasDropdown: true,
          dropdownItems: [
            {
              id: 1,
              title: "Mi perfil",
              url: "/profile",
              icon: "fa-solid fa-user",
            },
            {
              id: 2,
              title: "Cerrar sesión",
              url: "/",
              icon: "fa-solid fa-right-from-bracket",
            },
          ],
        }
      : {
          id: 5,
          title: "Iniciar sesión",
          url: "/logReg",
          icon: "fa-solid fa-right-to-bracket",
          titleActive: "false",
          hasDropdown: false,
        },
  ];

  const styles = {
    elementsContainer: {
      width: "100vw",
      height: "90vh",
    },

    elementWithMarginTop: {
      marginTop: "20vh",
      width: "100vw",
      height: "80vh",
    },

    navBar: {
      width: "100%",
      height: "10vh",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
    },
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          items={items}
          darkMode={true}
          searchBar={true}
          style={styles.navBar}
        />
       
        <Routes>
          <Route path="/" element={<HomePage style={styles.elementsContainer} />} />
          <Route path="/logReg" element={<Login  style={styles.elementWithMarginTop}/>} />
          <Route path="/cart" element={<Cart style={styles.elementWithMarginTop}/>} />
          <Route path="/profile" element={<Profile style={styles.elementWithMarginTop}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
