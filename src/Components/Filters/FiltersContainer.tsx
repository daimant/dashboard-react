import React from "react";
import {connect} from "react-redux";
import Filters from "./Filters";
import {requestOrg, requestWidgetsFromFilters, setPeriod} from "../Redux/filters-reducer";
import {
  selectIsFetchingFilters, selectKTL, selectOrgList, selectOrgName, selectOrgOid, selectPeriod, selectPeriodType,
  selectPerList, selectVal
} from "../Redux/selectors";

class WidgetsContainer extends React.Component<any> {
  componentDidMount() {
    //@ts-ignore
    if (!this.props.orgList.oid)
    //@ts-ignore
      this.props.requestOrg()
  }

  render() {
    return (
      <Filters
        // @ts-ignore
        orgList={this.props.orgList}
        isFetchingFilters={this.props.isFetchingFilters}
        orgOid={this.props.orgOid}
        orgName={this.props.orgName}
        ktl={this.props.ktl}
        val={this.props.val}
        requestWidgetsFromFilters={this.props.requestWidgetsFromFilters}
        setPeriod={this.props.setPeriod}
        perList={this.props.perList}
        period={this.props.period}
        periodType={this.props.periodType}
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
});

export default connect(mapState, {requestOrg, requestWidgetsFromFilters, setPeriod})(WidgetsContainer);
