import React from 'react';
import classes from './App.module.scss';
import Widgets from "./Components/Widgets/Widgets";
import Filters from "./Components/Filters/Filters";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className={classes.container}>
      <header>
        <Navbar/>
        <Filters/>
      </header>
      <Widgets/>
    </div>
  );
}

export default App;
