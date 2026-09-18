import "./Logo.css";

const Logo = ({ className, ...props }) => (
  <span className={`logo-mark ${className || ""}`} {...props}>
    <img src="/images/out/png/icon/ming-icon-128.png" alt="" className="logo-mark-icon" />
    <span className="logo-mark-text">Ming</span>
  </span>
);

export default Logo;
