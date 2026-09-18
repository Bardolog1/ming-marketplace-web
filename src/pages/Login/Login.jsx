import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import TextDefault from "../../components/TextDefault/TextDefault.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import styled from "styled-components";

const Login = ({ ...props }) => {
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  
  const imageRef = useRef();
  const registerRef = useRef();
  const loginRef = useRef();
  
  useEffect(() => {
    const viewHandler = () => {
      if (loginOrRegister === "login") {
        imageRef.current.style.transform = "translateX(-5%)";
        loginRef.current.classList.add("activeSpace");
        registerRef.current.classList.remove("activeSpace");
        loginRef.current.classList.remove("hideSpace");
        registerRef.current.classList.add("hideSpace");
        console.log(loginRef.current.querySelectorAll("form"))
        loginRef.current.querySelector("form").reset();
      } else {
        imageRef.current.style.transform = "translateX(100%)";
        loginRef.current.classList.remove("activeSpace");
        loginRef.current.classList.add("hideSpace");
        registerRef.current.classList.add("activeSpace");
        registerRef.current.classList.remove("hideSpace");
      }
    };
      
    viewHandler();
      
  }, [loginOrRegister]);

 

  const styles = {
    textButton: {
      color: "var(--color-primary)",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  const StyledRegister = styled(RegisterForm)`
    width: 90%;
    height: 90%;
  `;

  const StyledLogin = styled(LoginForm)`
    width: 90%;
    height: 90%;
  `;

  return (
    <>
      <div className="login" {...props}>
        <div className="container-all-login">
          <div className="container-login">
          
            <div className="Register-Space space" ref={registerRef}>
              <StyledRegister  />
            </div>

            <div className="Login-Space space" ref={loginRef}>
              <StyledLogin  ></StyledLogin>
            </div>

            <div className="Image-Login image-space login" ref={imageRef}>
              <img
                className="image"
                src="https://media.istockphoto.com/id/1028869800/photo/close-up-of-a-hands-of-a-businessman-on-a-keyboard.jpg?s=612x612&w=0&k=20&c=Z1nUpgbTH78D8JMqzosJD6lb90EVk54zkU941pdFAAo="
                alt="login"
              />
            </div>
            
          </div>
          <div className="options-select">
            {loginOrRegister === "login" ? (
              <TextDefault
                darkMode={true}
                onClick={() => setLoginOrRegister("register")}
              >
                don't have an account? <b style={styles.textButton}>Register</b>
              </TextDefault>
            ) : (
              <TextDefault
                darkMode={true}
                onClick={() => setLoginOrRegister("login")}
              >
                Already have an account?
                <b style={styles.textButton}> Login</b>
              </TextDefault>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
