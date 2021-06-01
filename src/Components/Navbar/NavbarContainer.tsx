import React from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {
  selectIsFetchingFilters,
  selectOrgMapList, selectOrgOid,
  selectPeriod,
  selectPeriodNameMapList,
  selectPeriodType,
  selectShowFilters
} from "../Redux/selectors";
import {setShowFilters} from "../Redux/filters-reducer";

class NavbarContainer extends React.Component<any> {
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

const mapState = (state: any) => ({
  showFilters: selectShowFilters(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  orgMapList: selectOrgMapList(state),
  periodNameMapList: selectPeriodNameMapList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
});

export default connect(mapState, {
  setShowFilters
})(NavbarContainer);
