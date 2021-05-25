import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import Filters from "./Filters";
import {requestOrg, requestWidgetsFromFilters, setPeriod} from "../Redux/filters-reducer";
import {
  // selectFnDate, selectStDate,
  selectIsFetchingFilters,
  selectKTL,
  selectOrgList,
  selectOrgName,
  selectOrgOid,
  selectPerList,
  selectVal
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
        // fnDate={this.props.fnDate}
        // stDate={this.props.stDate}
        ktl={this.props.ktl}
        val={this.props.val}
        requestWidgetsFromFilters={this.props.requestWidgetsFromFilters}
        setPeriod={this.props.setPeriod}
        perList={this.props.perList}
      />
    );
  }
}

const mapState = (state: any) => ({
  orgList: selectOrgList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  orgOid: selectOrgOid(state),
  orgName: selectOrgName(state),
  // fnDate: selectStDate(state),
  // stDate: selectFnDate(state),
  ktl: selectKTL(state),
  val: selectVal(state),
  perList: selectPerList(state),
});

export default connect(mapState, {requestOrg, requestWidgetsFromFilters, setPeriod})(WidgetsContainer);
