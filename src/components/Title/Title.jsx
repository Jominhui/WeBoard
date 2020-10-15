import React from "react";
import PropTypes from "prop-types";
import "./Title.scss";
import { Link } from "react-router-dom";

const Title = ({}) => {
  return (
    <>
      <div>
        <p>환영합니다.</p>
        <input />
        <div>
          <Link to="/Draw">
            <button>다음</button>
          </Link>
        </div>
      </div>
    </>
  );
};

Title.propTypes = {

};

export default Title;
