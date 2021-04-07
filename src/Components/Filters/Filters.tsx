import React from "react";
import classes from "./Filters.module.scss";
import Datepicker from "./Filter-components/Datepicker";
import FilterCheckBox from "./Filter-components/FilterCheckBox";

interface Props {}

const Filters: React.FC<Props> = props => {
  return (
    <div className={classes.filters}>
      <FilterCheckBox/>
      <Datepicker/>
      <Datepicker/>
      <Datepicker/>
      <Datepicker/>
      <Datepicker/>
    </div>
  )
};

export default Filters;
