import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";

const Header = ({ title }) => {

  return (
    <>
      <div className="Header">
        <div className="Header-Logo">WEBOARD</div>
        <div className="Header-Title">{title}</div>
      </div>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
