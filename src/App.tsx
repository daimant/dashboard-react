import React from 'react';
import classes from './App.module.scss';
import Navbar from "./Components/Navbar/Navbar";
import WidgetsContainer from "./Components/Widgets/WidgetsContainer";
import FiltersContainer from "./Components/Filters/FiltersContainer";

function App() {
  return (
    <div className={classes.container}>
      <header>
        <Navbar/>
        <FiltersContainer/>
      </header>
      {/*// @ts-ignore*/}
      <WidgetsContainer/>
    </div>
  );
}

export default App;
