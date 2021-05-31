import React from "react";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {selectShowFilters} from "../Redux/selectors";
import {setShowFilters} from "../Redux/filters-reducer";

class NavbarContainer extends React.Component<any> {
  componentDidMount() {
  }

  render() {
    return (
      <Navbar
        showFilters={this.props.showFilters}
        setShowFilters={this.props.setShowFilters}
      />
    );
  }
}

const mapState = (state: any) => ({
  showFilters: selectShowFilters(state),
});

export default connect(mapState, {
  setShowFilters
})(NavbarContainer);
