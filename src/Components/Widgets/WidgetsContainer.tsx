import React, {Component} from "react";
import {connect} from "react-redux";
import {requestWidgets} from "../Redux/widgets-reducer";
import {selectInf, selectIsFetchingWidgets, selectKPK, selectSC} from "../Redux/selectors";
import Widgets from "./Widgets";
import {WidgetsStateProps, RootState} from "../Common/Types";

class WidgetsContainer extends Component<WidgetsStateProps> {
  componentDidMount() {
    // @ts-ignore
    this.props.requestWidgets();
  }

  render() {
    return (
      <Widgets
        kpk={this.props.kpk}
        sc={this.props.sc}
        inf={this.props.inf}
        isFetchingWidgets={this.props.isFetchingWidgets}
      />
    );
  }
}

const mapState = (state: RootState) => ({
  kpk: selectKPK(state),
  sc: selectSC(state),
  inf: selectInf(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
});

// @ts-ignore
export default connect<WidgetsStateProps, {}, {}>(mapState, {requestWidgets})(WidgetsContainer);
