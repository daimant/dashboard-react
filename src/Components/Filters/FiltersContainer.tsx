import React from "react";
import {connect} from "react-redux";
import Filters from "./Filters";
import {requestOrg, requestWidgetsFromFilters, setFiltersDefault, setOrgOid, setPeriod} from "../Redux/filters-reducer";
import {
  selectIsFetchingFilters, selectKTL, selectOrgList, selectOrgMapList, selectOrgName, selectOrgOid, selectPeriod,
  selectPeriodNameMapList, selectPeriodType, selectPerList, selectSelectedFilters, selectShowFilters, selectVal
} from "../Redux/selectors";

class WidgetsContainer extends React.Component<any> {
  componentDidMount() {
    if (!this.props.orgList.oid)
      this.props.requestOrg()
  }

  render() {
    return (
      <Filters
        orgList={this.props.orgList}
        isFetchingFilters={this.props.isFetchingFilters}
        orgOid={this.props.orgOid}
        orgName={this.props.orgName}
        ktl={this.props.ktl}
        val={this.props.val}
        perList={this.props.perList}
        period={this.props.period}
        periodType={this.props.periodType}
        selectedFilters={this.props.selectedFilters}
        showFilters={this.props.showFilters}
        orgMapList={this.props.orgMapList}
        periodNameMapList={this.props.periodNameMapList}

        requestWidgetsFromFilters={this.props.requestWidgetsFromFilters}
        setPeriod={this.props.setPeriod}
        setOrgOid={this.props.setOrgOid}
        setFiltersDefault={this.props.setFiltersDefault}
      />
    );
  }
}

const mapState = (state: any) => ({
  orgList: selectOrgList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  orgOid: selectOrgOid(state),
  orgName: selectOrgName(state),
  ktl: selectKTL(state),
  val: selectVal(state),
  perList: selectPerList(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  selectedFilters: selectSelectedFilters(state),
  showFilters: selectShowFilters(state),

});

export default connect(mapState, {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  setFiltersDefault
})(WidgetsContainer);
