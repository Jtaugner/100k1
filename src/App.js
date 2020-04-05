import React from 'react';
import logo from './logo.svg';
import './root.css'
import './App.css';
import Menu from "./components/menu";
import {questions} from "./questions";

function App() {
  return (
      <>
        <Menu questions={questions}/>
      </>
  );
}

export default App;
