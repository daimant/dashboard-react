import React from "react";
import classes from "./Filters.module.scss";
import Datepicker from "./Filter-components/Datepicker";
import FilterCheckBox from "./Filter-components/FilterCheckBox";

interface Props {
}

const propsFilterOrgStructure = {
  title:'Оргструктура'
};
const propsFilterDocuments = {
  title:'Договор/КА'
};
const propsFilterValues = {
  title:'Значения'
};
const propsFilterView = {
  title:'Вид'
};

const Filters: React.FC<Props> = props => {
  return (
    <div className={classes.filters}>
      <FilterCheckBox title={propsFilterOrgStructure.title}/>
      <Datepicker/>
      <Datepicker/>
      <FilterCheckBox title={propsFilterDocuments.title}/>
      <FilterCheckBox title={propsFilterValues.title}/>
      <FilterCheckBox title={propsFilterView.title}/>
    </div>
  )
};

export default Filters;
