import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import Filters from "./Filters";
import {requestOrg, requestWidgetsFromFilters, setDate} from "../Redux/filters-reducer";
import {
  selectFnDate,
  selectIsFetchingFilters,
  selectKTL,
  selectOrgList,
  selectOrgName,
  selectOrgOid, selectPerList,
  selectStDate, selectVal
} from "../Redux/selectors";

class WidgetsContainer extends React.Component<any> {
  componentDidMount() {
    //@ts-ignore
    if (!this.props.org_list.oid)
    //@ts-ignore
      this.props.requestOrg()
  }

  render() {
    return (
      <Filters
        // @ts-ignore
        org_list={this.props.org_list}
        isFetchingFilters={this.props.isFetchingFilters}
        org_oid={this.props.org_oid}
        org_name={this.props.org_name}
        fn_date={this.props.fn_date}
        st_date={this.props.st_date}
        ktl={this.props.ktl}
        val={this.props.val}
        requestWidgetsFromFilters={this.props.requestWidgetsFromFilters}
        setDate={this.props.setDate}
        per_list={this.props.per_list}
      />
    );
  }
}

const mapState = (state: any) => ({
  org_list: selectOrgList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  org_oid: selectOrgOid(state),
  org_name: selectOrgName(state),
  fn_date: selectStDate(state),
  st_date: selectFnDate(state),
  ktl: selectKTL(state),
  val: selectVal(state),
  per_list: selectPerList(state),
});

export default connect(mapState, {requestOrg, requestWidgetsFromFilters, setDate})(WidgetsContainer);
