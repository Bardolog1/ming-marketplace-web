import React from "react";
import "./InputDefault.css";
import styled from "styled-components";
import TextDefault from "../TextDefault/TextDefault";

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: rem;
  border: none;
  width: 100%;
  height: 100%;
  transition: border 0.6s ease;

  &.ambiented {
    background-color: transparent;
    border-bottom: 1px solid var(--color-foreground);
    color: var(--color-foreground);
  }

  &.rounded:focus,
  &.rounded:valid {
    border-radius: 10px;
  }

  &:focus,
  &:valid {
    outline: none;
    border: 1px solid var(--color-primary);

  }

  &:focus ~ label,
  &:valid ~ label {
    top: 0;
    left: 2%;
    width: auto;
    background-color: var(--color-background);
    padding: 0 5%;
    border-radius: 20px;
    transform: translate(0, 0);
    font-size: 0.8em;
    color: var(--color-primary);
    z-index: 1;
  }

  &.error {
    border: 1px solid var(--color-danger);
  }
  
 
  
`;

const Label = styled.label`
  font-size: 0.8rem;
  position: absolute;
  color: var(--color-foreground-muted);
  left: 50%;
  top: 50%;
  width: auto;
  text-align: center;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in, background-color 0s ease, color 0s ease, width 0s ease;
  z-index: -1;

  
  
  
`;

const styles = {
  error: {
      position: 'absolute',
      left: '0.5rem',
      bottom: '-30%',
      color: 'var(--color-danger)',
      fontSize: '0.8rem',
  }
}

const InputDefault = ({ ...props }) => {
  return (
    <div className="input-default">
      <Input
        autoFillField="off"
        required={props.required}
        id={props.label}
        type={props.type}
       
        placeholder={props.decorated ? "" : props.label}
        className={`
        ${props.darkMode ? "ambiented" : ""} 
        ${props.rounded ? "rounded" : ""}
        ${props.error? "error" : ""}
        `}
        {...props}
      />
      {props.decorated && (
        <Label className={ `${props.darkMode ? "ambiented" : ""} `} id={props.label}>
          {props.label}
        </Label>
      )}
      {props.error &&  <TextDefault style={styles.error}>{props.error}</TextDefault>}
    </div>
  );
};

export default InputDefault;
