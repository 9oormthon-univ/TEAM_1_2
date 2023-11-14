import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout";
import { useMediaQuery } from "react-responsive";

function App() {
  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
