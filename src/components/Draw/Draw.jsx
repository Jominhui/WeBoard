import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./Draw.scss";

const Draw = ({}) => {
  const canvasRef = useRef(null)
  
  const [tool, setTool] = useState("stroke");
  const [isDrawing, setisDrawing] = useState(false);

  const [startPath, setStartPath] = useState([]);
  const [endPath, setEndPath] = useState([]);

  //stroke
  const strokeDown = useCallback((e, ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(e.offsetX, e.offsetY);
  }, [])

  const strokeMove = useCallback((e, ctx) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }, [])

  //eraser
  const eraserDown = useCallback((e, ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(e.offsetX, e.offsetY);
  }, [])

  const eraserMove = useCallback((e, ctx) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }, [])

  //square
  const squareDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const squareMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const drawSquare = useCallback((e, ctx) => {
    const sx = startPath[0];
    const sy = startPath[1];
    const ex = endPath[0];
    const ey = endPath[1];
    
    ctx.rect(sx, sy, ex-sx, ey-sy);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }, [startPath, endPath])

  //triangle
  const triangleDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const triangleMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const drawTriangle = useCallback((e, ctx) => {
    const sx = startPath[0];
    const sy = startPath[1];
    const ex = endPath[0];
    const ey = endPath[1];
    
    ctx.moveTo((ex + sx)/2, sy);
    ctx.lineTo(sx, ey);
    ctx.lineTo(ex, ey);
    ctx.lineTo((ex + sx)/2, sy);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }, [startPath, endPath])

  //circle
  const circleDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const circleMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, [])

  const drawCircle = useCallback((e, ctx) => {
    const sx = startPath[0];
    const sy = startPath[1];
    const ex = endPath[0];

    ctx.arc(sx, sy, Math.abs(ex-sx), 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }, [startPath, endPath])

  const down = useCallback((e) =>{
    const ctx = canvasRef.current.getContext('2d')

    setisDrawing(true);
    switch(tool) {
      case "stroke":
        strokeDown(e, ctx);
        break;
      case "eraser":
        eraserDown(e, ctx);
        break;    
      case "square":
        squareDown(e, ctx);
        break;
      case "triangle":
        triangleDown(e, ctx);
        break;
      case "circle":
        circleDown(e, ctx);
        break;
    }
  }, [tool, strokeDown, squareDown])

  const move = useCallback((e) =>{
    if(!isDrawing) return;

    const ctx = canvasRef.current.getContext('2d')

    switch(tool) {
      case "stroke":
        strokeMove(e, ctx);
        break;
      case "eraser":
        eraserMove(e, ctx);
        break;
      case "square":
        squareMove(e, ctx);
        break;
      case "triangle":
        triangleMove(e, ctx);
        break;
      case "circle":
        circleMove(e, ctx);
        break;
    }
  }, [tool, isDrawing, strokeMove, squareMove])


  const draw = useCallback((e) => {
    const ctx = canvasRef.current.getContext('2d')

    switch(tool) {
      case "stroke":
        break;
      case "eraser":
        break;
      case "square":
        drawSquare(e, ctx);
        break;
      case "triangle":
        drawTriangle(e, ctx);
        break;
      case "circle":
        drawCircle(e, ctx);
        break;
    }
    setisDrawing(false);
  }, [tool, drawSquare]);
  
  useEffect(() => {
    const canvas = document.getElementsByClassName("Canvas-Drawing");

    canvas[0].addEventListener('mousedown', down, true);
    canvas[0].addEventListener('mousemove', move, true);
    canvas[0].addEventListener('mouseup', draw, true);
    canvas[0].addEventListener('mouseout', draw, true);

    return(() => {
      const canvas = document.getElementsByClassName("Canvas-Drawing");

      canvas[0].removeEventListener('mousedown', down, true);
      canvas[0].removeEventListener('mousemove', move, true);
      canvas[0].removeEventListener('mouseup', draw, true);
      canvas[0].removeEventListener('mouseout', draw, true);
    })
  }, [isDrawing, tool, draw])

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
          <div className="Tools-menu">저장</div>
        </div>

        <div className="Canvas">
          <canvas className="Canvas-Drawing" width="1500" height="900" ref={canvasRef}/>
        </div>
      </div>
    </>
  );
};

Draw.propTypes = {

};

export default Draw;
