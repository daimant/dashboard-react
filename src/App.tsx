import React from 'react';
import classes from './App.module.scss';
import WidgetsContainer from './Components/Widgets/WidgetsContainer';
import FiltersContainer from './Components/Filters/FiltersContainer';
import Navbar from './Components/Navbar/Navbar';

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
