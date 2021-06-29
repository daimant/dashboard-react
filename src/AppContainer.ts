// import {compose} from "redux";
// import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import App from './App';

// для роутинга
// const mapStateToProps = () => ({});
// const AppContainer = compose(withRouter, connect(mapStateToProps, {}))(App);
const AppContainer = connect(() => ({}), {})(App);

export default AppContainer;
