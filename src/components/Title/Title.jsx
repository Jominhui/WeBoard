import React from "react";
import PropTypes from "prop-types";
import "./Title.scss";
import { Link } from "react-router-dom";

const Title = ({}) => {
  return (
    <>
      <div className="Title">
        <p className="Title-coment">환영합니다!</p>
        <p className="Title-coment">당신의 그림을 WEBOARD 그려주세요.</p>
        <input className="Title-box" autoFocus />
        
        <Link to="/Draw">
          <div className="Title-btn">
              다음
          </div>
        </Link>
      </div>
    </>
  );
};

Title.propTypes = {

};

export default Title;
