import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./Draw.scss";

const Draw = ({ width, setTool, setColor, setWidth, canvasRef }) => {
  return (
    <>
      <div className="Draw-area">
        <div className="Tools">
          <div className="Tools-Title">Tools</div>
          <div className="Tools-menu" onClick={() => setTool("stroke")}>선</div>
          <div className="Tools-menu" onClick={() => setTool("eraser")}>지우개</div>
          <div className="Tools-menu" onClick={() => setTool("square")}>사각형</div>
          <div className="Tools-menu" onClick={() => setTool("triangle")}>삼각형</div>
          <div className="Tools-menu" onClick={() => setTool("circle")}>원</div>
          <div className="Tools-menu" onClick={() => setTool("image")}>이미지</div>
          <div className="Tools-menu">
            색
            <input type="color" onChange={(e) => setColor(e.target.value)} />
            </div>
          <div className="Tools-menu">
            크기
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}/>
            </div>
          <div className="Tools-menu">저장</div>
        </div>

        <div className="Canvas">
          <canvas className="Canvas-Drawing" width="1500" height="900" ref={canvasRef} />
        </div>
      </div>
    </>
  );
};

Draw.propTypes = {

};

export default Draw;
