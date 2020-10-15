import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Draw.scss";

const Draw = ({}) => {
  const canvasRef = useRef(null)
  
  const stroke = (ctx) => {
    const canvas = document.getElementsByClassName("Canvas-Drawing");
    
    const down = (e) =>{
      // if ( currJob != "stroke" ) return;
      // isDrawing = true;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(e.offsetX, e.offsetY);
    }

    const move = (e) =>{
      // if ( currJob != "stroke" ) return;
      // if(!isDrawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "black";
      ctx.stroke();
    }

    const draw_stroke = () => {
      // if ( currJob != "stroke" ) return;
      // isDrawing = false;
    }

    canvas[0].addEventListener('mousedown', down, true);
    canvas[0].addEventListener('mousemove', move, true);
    canvas[0].addEventListener('mouseup', draw_stroke, true);
    canvas[0].addEventListener('mouseout', draw_stroke, true);
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    stroke(context)
  }, [stroke])

  return (
    <>
      <div className="Draw-area">
        <div className="Tools">
          <div className="Tools-Title">Tools</div>
          <div className="Tools-menu">선</div>
          <div className="Tools-menu">지우개</div>
          <div className="Tools-menu">사각형</div>
          <div className="Tools-menu">삼각형</div>
          <div className="Tools-menu">원</div>
          <div className="Tools-menu">이미지</div>
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
