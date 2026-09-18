import React, { useEffect, useState } from "react";
import "./NavBar.css";
import NavBarItem from "../NavBarItem/NavBarItem.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ThemeToggle from "../ui/ThemeToggle/ThemeToggle.jsx";
import { Link } from "react-router-dom";
import Logo from "../Logocomponent/Logo.jsx";

const NavBar = ({ items, ...props }) => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarBackground, setNavBarBackground] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [activeDropDownItem, setActiveDropDownItem] = useState(0);
 
  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  
  useEffect(() => {
    changeBackground();
  },[scrollPosition]);
  
/*listen active item*/
  useEffect(() => {
    const changeActiveItem = () => {
      const index = items.findIndex((item) => item.url === window.location.pathname);
      setActiveItem(index);
    };
    changeActiveItem();
  }, []);
  
  const setItemActive = (k) => {
    setActiveItem(k);
  }
  
  const setActiveDropDown = (k) => {
    setActiveDropDownItem(k);
  }
  

  const changeBackground = () => {
    if (scrollPosition >= 500) {
      setNavBarBackground(true);
    } else {
      setNavBarBackground(false);
    }
  }
  
  
  
  

  return (
    <>
      <div className= {`navbar ${navBarBackground?"with-color":"without-color"}`}  {...props}>
        <div className="container-navbar">
          <div className="left">
            <div className="logo">
              <Link to={"/"} rel="noreferrer">
                <Logo className="logoSVG"  darkMode={navBarBackground}/>
              </Link>
            </div>
          </div>

          {props.searchBar ? (
            <div className="nav-search">
              <SearchBar navScroll={navBarBackground}></SearchBar>
            </div>
          ) : null}

          <ul className="right">
            {items.map((item) => (

                <NavBarItem
                  activeItem={activeItem}
                  setItemActive={setItemActive}
                  setActiveDropDown={setActiveDropDown}
                  activeDropDownItem={activeDropDownItem}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                  titleActive={item.titleActive}
                  navScroll={navBarBackground}
                  hasDropdown={item.hasDropdown}
                  dropdownItems={item.dropdownItems}
                  badge={item.badge}
                />
          
            ))}
            {props.darkMode ? (
              <li className="toggle">
                <ThemeToggle />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
