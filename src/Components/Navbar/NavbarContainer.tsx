import React, {Component} from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {
  selectIsFetchingFilters, selectOrgMapList, selectOrgOid, selectPeriod, selectPeriodNameMapList, selectPeriodType,
  selectShowFilters
} from "../Redux/selectors";
import {setShowFilters} from "../Redux/filters-reducer";
import {RootStateType} from "../Redux/store";

type MapStatePropsType = {
  showFilters: boolean
  orgOid: string
  period: string
  periodType: string
  orgMapList: Map<string, string>
  periodNameMapList: Map<string, string>
  isFetchingFilters: boolean
}
type MapDispatchPropsType = {
  setShowFilters: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class NavbarContainer extends Component<PropsType> {
  componentDidMount() {
  }

  render() {
    return (
      <Navbar
        showFilters={this.props.showFilters}
        orgOid={this.props.orgOid}
        period={this.props.period}
        periodType={this.props.periodType}
        orgMapList={this.props.orgMapList}
        periodNameMapList={this.props.periodNameMapList}
        isFetchingFilters={this.props.isFetchingFilters}

        setShowFilters={this.props.setShowFilters}
      />
    );
  }
}

const mapState = (state: RootStateType) => ({
  showFilters: selectShowFilters(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  orgMapList: selectOrgMapList(state),
  periodNameMapList: selectPeriodNameMapList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  setShowFilters
})(NavbarContainer);
