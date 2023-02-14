/* eslint-disable no-unused-vars */
import React, {useState} from "react"
import Header from "./Components/Header";
import Meme from "./Components/Meme";
import Canvas from "./Components/Canvas";
import Excalidraw from "./Components/Excalidraw";
import DynamicCanvas from "./Components/DynamicCanvas";
import WindowTracker from "./Components/WindowTracker"


function App() {
  
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Canvas /> */}
      <Meme />
      {/* <Excalidraw /> */}
      {/* <DynamicCanvas /> */}
    </div>
    
  );
}

export default App;
