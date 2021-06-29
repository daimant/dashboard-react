import React from 'react';
import classes from './App.module.scss';
import WidgetsContainer from './Components/Widgets/WidgetsContainer';
import FiltersContainer from './Components/Filters/FiltersContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';

function App() {
  return (
    <div className={classes.container}>
      <header>
        <NavbarContainer/>
        <FiltersContainer/>
      </header>
      <WidgetsContainer/>
    </div>
  );
}

export default App;
