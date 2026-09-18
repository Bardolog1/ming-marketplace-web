import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  margin: 8px auto;
  padding: 8px 16px;
  border-radius: 12px;
  transition: background-color 200ms ease, color 200ms ease;

  & .iconItem {
    max-width: 20px;
    margin-right: 8px;
    opacity: 0.5;
    color: var(--color-foreground);
  }

  &:hover {
    background-color: color-mix(in srgb, var(--color-foreground) 10%, transparent);
    color: var(--color-primary);
  }

  &:hover .dropdown-item .iconItem {
    opacity: 1;
    text-shadow: 0 0 10px var(--color-primary);
  }

  &:hover .dropdown-item span {
    cursor: pointer;
    text-shadow: 0 0 10px var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }

  &:active {
    background-color: color-mix(in srgb, var(--color-foreground) 50%, transparent);
    transform: scale(0.98);
  }
`;

const Item = styled.li`
  background-color: transparent;
  list-style: none;
  padding: 10px 0;
`;

const DropDownItem = ({ id, text, url, icon, style, ...props }) => {
  const spanTextStyles = {
    fontSize: "0.8rem",
    fontWeight: "400",
    color: "var(--color-foreground)",
    maxWidth: "200px",
    marginLeft: "10px",
  };


  return (
    <StyledLink to={url} style={style}>
      <Item id={id} className="dropdown-item" {...props}>
        <i className={icon + " " + "iconItem"} />
        <span style={spanTextStyles}>{text}</span>
      </Item>
    </StyledLink>
  );
};

export default DropDownItem;
