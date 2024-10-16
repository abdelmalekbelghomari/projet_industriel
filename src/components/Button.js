import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

function check(buttonProperty, array) {
  return array.includes(buttonProperty) ? buttonProperty : array[0];
}

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkButtonStyle = check(buttonStyle, STYLES);
  const checkButtonSize = check(buttonSize, SIZES);
  return (
    <Link to="/sign-up" className="btn-mobile">
      <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
        {children}
      </button>
    </Link>
  );
}

export default Button;