import React, {useState, useEffect, useRef} from "react";

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

  // console.log(state);
  // var texts = state.texts;
  // clear the canvas & redraw all texts
    function draw(state) {
      const ctx = canvas.current.getContext("2d");  
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      for (var i = 0; i < state.length; i++) {
          var text = state[i];
          // debugger
          ctx.fillText(text.text, text.x, text.y);
      }
    }

    function textHittest(x, y, textIndex) {
      var text = state[textIndex];
      // debugger;
      return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
      // return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height);
    }
  
    function handleMouseDown(e) {
      e.preventDefault();
      startX = parseInt(e.clientX - offsetX);
      startY = parseInt(e.clientY - offsetY);
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
    var text = state[selectedText];

    // debugger

    setState(prevState => {
      const newState = prevState.map(drag_text =>{
        if (drag_text.id === text.id) {
          
          const xx = drag_text.x + dx;
          const yy = drag_text.y + dy;
          // debugger
          return {
            ...drag_text,
            x: xx,
            y: yy
          };
        }
        return drag_text;
      }) 
      texts = newState;
      draw(texts);
      return newState;
    });
  };

  function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
  }

  function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
  }

  useEffect(() => {
    texts = state;
    draw(texts);
  }, [draw]);



  return (
    <main>
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