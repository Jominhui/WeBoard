import React, { useState, useCallback, useRef, useEffect } from "react";
import { inject, observer } from "mobx-react";
import Header from "components/Header/index";
import Draw from "components/Draw/index";

const MainContainer = () => {
  const title = localStorage.getItem("name");

  const canvasRef = useRef(null);

  const [tool, setTool] = useState("stroke");
  const [isDrawing, setisDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [width, setWidth] = useState(1);
  const [startPath, setStartPath] = useState([]);
  const [endPath, setEndPath] = useState([]);

  //stroke
  const strokeDown = useCallback(
    (e, ctx) => {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.moveTo(e.offsetX, e.offsetY);
    },
    [width]
  );

  const strokeMove = useCallback(
    (e, ctx) => {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    [color]
  );

  //eraser
  const eraserDown = useCallback(
    (e, ctx) => {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.moveTo(e.offsetX, e.offsetY);
    },
    [width]
  );

  const eraserMove = useCallback((e, ctx) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }, []);

  //square
  const squareDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const squareMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const drawSquare = useCallback(
    (e, ctx) => {
      const sx = startPath[0];
      const sy = startPath[1];
      const ex = endPath[0];
      const ey = endPath[1];

      ctx.rect(sx, sy, ex - sx, ey - sy);
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    [startPath, endPath, color]
  );

  //triangle
  const triangleDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const triangleMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const drawTriangle = useCallback(
    (e, ctx) => {
      const sx = startPath[0];
      const sy = startPath[1];
      const ex = endPath[0];
      const ey = endPath[1];

      ctx.moveTo((ex + sx) / 2, sy);
      ctx.lineTo(sx, ey);
      ctx.lineTo(ex, ey);
      ctx.lineTo((ex + sx) / 2, sy);
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    [startPath, endPath, color]
  );

  //circle
  const circleDown = useCallback((e, ctx) => {
    ctx.beginPath();
    setStartPath([e.offsetX, e.offsetY]);
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const circleMove = useCallback((e) => {
    setEndPath([e.offsetX, e.offsetY]);
  }, []);

  const drawCircle = useCallback(
    (e, ctx) => {
      const sx = startPath[0];
      const sy = startPath[1];
      const ex = endPath[0];

      ctx.arc(sx, sy, Math.abs(ex - sx), 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    [startPath, endPath, color]
  );

  const down = useCallback(
    (e) => {
      const ctx = canvasRef.current.getContext("2d");

      setisDrawing(true);
      switch (tool) {
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
    },
    [tool, strokeDown, squareDown, triangleDown, circleDown]
  );

  const move = useCallback(
    (e) => {
      if (!isDrawing) return;

      const ctx = canvasRef.current.getContext("2d");

      switch (tool) {
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
    },
    [tool, isDrawing, strokeMove, squareMove, drawCircle, circleMove]
  );

  const draw = useCallback(
    (e) => {
      const ctx = canvasRef.current.getContext("2d");

      switch (tool) {
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
    },
    [tool, drawSquare, drawTriangle, drawCircle]
  );

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", down, true);
      canvasRef.current.addEventListener("mousemove", move, true);
      canvasRef.current.addEventListener("mouseup", draw, true);
      canvasRef.current.addEventListener("mouseout", draw, true);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", down, true);
        canvasRef.current.removeEventListener("mousemove", move, true);
        canvasRef.current.removeEventListener("mouseup", draw, true);
        canvasRef.current.removeEventListener("mouseout", draw, true);
      }
    };
  }, [isDrawing, tool, draw, canvasRef, width]);

  return (
    <>
      <Header title={title} />
      <Draw
        width={width}
        setTool={setTool}
        setColor={setColor}
        setWidth={setWidth}
        canvasRef={canvasRef}
        save={save}
      />
    </>
  );
};

export default inject("store")(observer(MainContainer));
