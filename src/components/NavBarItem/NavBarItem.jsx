import React, { useEffect, useState } from "react";
import "./NavBarItem.css";
import { Link } from "react-router-dom";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

const NavBarItem = ({
  title,
  url,
  navScroll,
  id,
  activeItem,
  setItemActive,
  setActiveDropDown,
  activeDropDownItem,
  ...props
}) => {
  const [opened, setOpened] = useState(false);

  const styles = {
    drop: {
      position: "absolute",
      top: "250%",
      left: "-100%",
      width: "200px",
      zIndex: "700",
    },
  };

  useEffect(() => {
    if (activeDropDownItem != id) {
      setOpened(false);
    }
  }, [activeDropDownItem]);

  const animationClick = (k) => {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      if (item.id == k) {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        } else {
          if (!props.hasDropdown) {
            item.classList.add("active");
            setItemActive(k);
          } else {
            setActiveDropDown(k);

            if (opened) {
              setOpened(false);
            } else {
              setOpened(true);
            }
          }
        }

        item.classList.add("animation");
        setTimeout(() => {
          item.classList.remove("animation");
        }, 3000);
      }
    });
  };

  return (
    <>
      <Link
        className={`nav-link ${navScroll ? " navScroll" : ""} `}
        to={url}
        onClickCapture={() => animationClick(id)}
      >
        <li
          id={id}
          className={` nav-item ${
            activeItem === id && !props.hasDropdown ? "active" : ""
          }`}
        >
          {props.titleActive === "true" ? (
            title
          ) : (
            <span className="icon-badge-wrap">
              <icon className={props.icon ? props.icon : ""} />
              {props.badge !== undefined && (
                <span className="nav-badge">{props.badge}</span>
              )}
            </span>
          )}
        </li>{" "}
        {props.hasDropdown && (
          <DropDownMenu
            isOpened={opened}
            style={styles.drop}
            title={title}
            changeOpen={setOpened}
            items={props.dropdownItems}
          />
        )}
      </Link>
    </>
  );
};

export default NavBarItem;
