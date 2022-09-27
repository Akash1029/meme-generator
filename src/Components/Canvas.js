import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

function Canvas() {
  const canvas = useRef();
  let offsetX;
  let offsetY;
  let scrollX;
  let scrollY;
  let mouseX;
  let mouseY;
  var texts;
  useEffect(() =>{
    offsetX = canvas.current.offsetLeft;
    offsetY = canvas.current.offsetTop;
    scrollX = canvas.current.scrollLeft;
    scrollY = canvas.current.scrollTop;
    draw();
  })

  const data = [
    {id: 1, text: 'Austria', height: 200, width: 200, x: 200, y: 200},
    {id: 2, text: 'Belgium', height: 200, width: 200, x: 100, y: 100},
    {id: 3, text: 'Canada', height: 200, width: 200, x: 50, y: 50},
  ];
  let startX;
  let startY;
  let selectedText = -1;
  const [state, setState] = useState(data);

  console.log(state);
  // var texts = state.texts;
  // clear the canvas & redraw all texts
  function draw() {
      texts = state;
      const ctx = canvas.current.getContext("2d");  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < state.length; i++) {
          var text = state[i];
          ctx.fillText(text.text, text.x, text.y);
      }
    }

    function textHittest(x, y, textIndex) {
      // debugger;
        var text = state[textIndex];
        // return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height);
    }
  
    function handleMouseDown(e) {
      e.preventDefault();
      startX = parseInt(e.clientX - offsetX);
      startY = parseInt(e.clientY - offsetY);
      console.log(state.length);
      // debugger
      for (var i = 0; i < state.length; i++) {
        // console.log(textHittest(startX, startY, i));
        if (textHittest(startX, startY, i)) {
          selectedText = i;
        }
      }
    }

  function handleMouseMove(e){
    // console.log(selectedText);
    if (selectedText < 0) {
      return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    var text = state[1];
    debugger;
    console.log(dx, dy);
    setState(prevState => {
      const newState = prevState.map(drag_text =>{
        
        // if (drag_text == text) {
          return {
            ...drag_text,
            x: mouseX,
            y: mouseY
          };
        // }
      }) 
      return newState;
    });
    draw();

  };





  return (
    <main>
      {/* <div>
        {state.x || state.y
          ? "The mouse is at x: " + state.x + ", y: " + state.y
          : "Move the mouse over this box"}
      </div> */}
      <canvas id="canvas" ref={canvas} width={300} height={300} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}/>
    </main>
  );
}

export default Canvas;