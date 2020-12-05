import React from "react";
import PropTypes from "prop-types";
import "./Title.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const Title = ({ title, setTitle, nextPage }) => {

  return (
    <>
      <div className="Title">
        <p className="Title-coment">환영합니다!</p>
        <p className="Title-coment">당신의 그림을 WEBOARD 그려주세요.</p>
        <input className="Title-box" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <div className="Title-btn" onClick={() => nextPage()}>
            다음
        </div>
      </div>
    </>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};

export default Title;
