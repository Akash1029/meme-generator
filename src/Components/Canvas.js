/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useRef, useEffect} from "react";

function Canvas(){

  const canvas = useRef();
  const inputRef = useRef();
  let ctx = null;
  let offsetX;
  let offsetY;
  let scrollX;
  let scrollY;
  let mouseX;
  let mouseY;
  let dragTarget = null;

  // const data = [
  //   {id: 1, text: 'Austria', h: 20, w: 30, x: 200, y: 200}
  // ];
  const [data, setData] = useState([]);


  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    offsetX = canvasEle.offsetLeft;
    offsetY = canvasEle.offsetTop;
    scrollX = canvasEle.scrollLeft;
    scrollY = canvasEle.scrollTop;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  });

  let startX;
  let startY;
  let isDown = false;

  function draw() {
    const ctx = canvas.current.getContext("2d");  
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for (var i = 0; i < data.length; i++) {
        var text = data[i];
        // debugger
        ctx.font = '16px serif';
        ctx.fillText(text.text, text.x, text.y);

    }
  }
  function textHit(x, y, textIndex) {
    let isTarget = null;
    for (let i = 0; i < data.length; i++) {
      const text = data[i];
      if (x >= text.x && x <= text.x + text.w && y >= text.y - text.h && y <= text.y) {
        dragTarget = text;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  }

  function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isDown = textHit(startX, startY);
  }

  function handleMouseMove(e){
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    if(dragTarget.y >15){
      dragTarget.y += dy;
    }else {
      dragTarget.y += 16;
    }
    if(dragTarget.x > 15){
      dragTarget.x += dx;
    }else {
      dragTarget.x += 16;

    }
    draw();
  };

  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }

  function addText(e) {
    e.preventDefault();
    const newData = {text: inputRef.current.value, h: 20, w: 30, x: 200, y: 200};
    
    setData(prevData => [...prevData, newData])
    // setMyArray(oldArray => [...oldArray, newElement]);
    // draw();

    inputRef.current.value = null;
  }

  useEffect(() => {
    draw(data);
  });
  return (
    <main>
       <div className="form">
          <input 
              type="text"
              placeholder="Add text"
              className="form--input top"
              name="newText"
              ref={inputRef}
          />
          <button 
              className="form--button"
              onClick={addText}
          >Add Text</button>  
        </div>
      {/* <div>
        {state.x || state.y
          ? "The mouse is at x: " + state.x + ", y: " + state.y
          : "Move the mouse over this box"}
      </div> */}
      <canvas 
        id="canvas" 
        ref={canvas} 
        width={window.innerWidth}
        height={window.innerHeight} 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp = {handleMouseUp} 
        onMouseOut={handleMouseOut}
      >
        Canvas
      </canvas>
    </main>
  );

}

export default Canvas;