import React from 'react';
import classes from './App.module.scss';
import Widgets from "./Components/Widgets/Widgets";
import Filters from "./Components/Filters/Filters";
import Navbar from "./Components/Navbar/Navbar";
import {widgetsAPI} from './API/API';
import WidgetsContainer from "./Components/Widgets/WidgetsContainer";
import FiltersContainer from "./Components/Filters/FiltersContainer";

function App() {
  return (
      <div className={classes.container}>
        <header>
          <Navbar/>
          <FiltersContainer/>
        </header>
        <WidgetsContainer/>
      </div>
  );
}

export default App;
