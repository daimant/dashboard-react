import React from 'react';
import classes from './App.module.scss';
import Widgets from './Components/Widgets/Widgets';
import Filters from './Components/Filters/Filters';
import Navbar from './Components/Navbar/Navbar';
import {connect} from "react-redux";
import {RootStateType} from "./Redux/store";
import {selectSelectedKTL, selectSelectedWorkers} from "./Redux/selectors";
import {Preloader} from "./Components/Common/Preloader/Preloader";

type MapStatePropsType = {
  selectedKTL: number[]
  selectedWorkers: number[]
};

type MapDispatchPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType;


const App = ({selectedKTL, selectedWorkers}: PropsType) => {
  return (
    <div className={classes.container}>
      <header>
        <Navbar/>
        <Filters/>
      </header>
      {selectedKTL.length || selectedWorkers.length ? <Widgets/> : <Preloader/>}
    </div>
  );
};

const mapState = (state: RootStateType): MapStatePropsType => ({
  selectedKTL: selectSelectedKTL(state),
  selectedWorkers: selectSelectedWorkers(state),
});

const mapDispatch = {};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(App);
