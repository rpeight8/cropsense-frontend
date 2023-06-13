import { useState } from "react";
import "./App.scss";
import NavigationSideBar from "./components/NavigationSideBar/NavigationSideBar";

function App() {
  return (
    <div className="layout">
      <NavigationSideBar />
      <div className="content">Content</div>
    </div>
  );
}

export default App;
