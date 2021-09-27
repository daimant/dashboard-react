import React from 'react';
import Filters from './Components/Filters/Filters';
import Navbar, {defPath} from './Components/Navbar/Navbar';
import Widgets from './Components/Widgets/Widgets';
import classes from './App.module.scss';
import {connect} from 'react-redux';
import {RootStateType} from './Redux/store';
import {selectSelectedKTL, selectSelectedWorkers} from './Redux/selectors';
import {Preloader} from './Components/Common/Preloader/Preloader';
import {SelectedKTLType, SelectedWorkersType} from './Types/Types';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

type MapStatePropsType = {
  selectedKTL: SelectedKTLType
  selectedWorkers: SelectedWorkersType
};

type MapDispatchPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const App = ({selectedKTL, selectedWorkers}: PropsType) => {
  return (
    <Router>
      <div className={classes.container}>
        <header>
          <Navbar/>
          <Filters/>
        </header>
        {selectedKTL.length || selectedWorkers.length
          ? <Switch>
              <Route exact
                     path='/'
                     render={() => <Redirect to={defPath}/>}
              />
              <Route path={defPath} component={Widgets}/>
              <Route path='/reyting-sotrudnikov' render={() => <Preloader title={'Здесь скоро будет рейтинг сотрудников'}/>}/>
              <Route path='/statistika-oo' render={() => <Preloader title={'Здесь скоро будет статистика по объектам обслуживания'}/>}/>
              <Route path='*' render={() => <Preloader title={'Страница не найдена'}/>}/>
          </Switch>
          : <Preloader/>}
      </div>
    </Router>
  );
};

const mapState = (state: RootStateType): MapStatePropsType => ({
  selectedKTL: selectSelectedKTL(state),
  selectedWorkers: selectSelectedWorkers(state),
});

const mapDispatch = {};

export default compose<any>(withRouter, connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch))(App);
