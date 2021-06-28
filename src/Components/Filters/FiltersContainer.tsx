import React, {Component} from "react";
import {connect} from "react-redux";
import Filters from "./Filters";
import {requestOrg, requestWidgetsFromFilters, requestSetFiltersDefault, setOrgOid, setPeriod} from "../Redux/filters-reducer";
import {
  selectIsFetchingFilters, /*selectVal, selectKTL,*/ selectOrgList, selectOrgOid, selectPeriod, selectPeriodType,
  selectPerList, selectShowFilters, selectAltOrgList, selectIsFetchingWidgets
} from "../Redux/selectors";
import {RootStateType} from "../Redux/store";

class FiltersContainer extends Component<any> {
  componentDidMount() {
    if (!this.props.orgList.oid)
      this.props.requestOrg()
  }

  render() {
    return (
      <Filters
        orgList={this.props.orgList}
        altOrgList={this.props.altOrgList}
        isFetchingFilters={this.props.isFetchingFilters}
        isFetchingWidgets={this.props.isFetchingWidgets}
        orgOid={this.props.orgOid}
        // ktl={this.props.ktl}
        // val={this.props.val}
        perList={this.props.perList}
        period={this.props.period}
        periodType={this.props.periodType}
        showFilters={this.props.showFilters}

        requestWidgetsFromFilters={this.props.requestWidgetsFromFilters}
        setPeriod={this.props.setPeriod}
        setOrgOid={this.props.setOrgOid}
        requestSetFiltersDefault={this.props.requestSetFiltersDefault}
      />
    );
  }
}

const mapState = (state: RootStateType) => ({
  orgList: selectOrgList(state),
  altOrgList: selectAltOrgList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  // ktl: selectKTL(state),
  // val: selectVal(state),
  perList: selectPerList(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  showFilters: selectShowFilters(state),
});

export default connect(mapState, {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  requestSetFiltersDefault
})(FiltersContainer);
