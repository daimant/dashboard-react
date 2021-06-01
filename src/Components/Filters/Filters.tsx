import React from "react";
import classes from "./Filters.module.scss";
import {Preloader} from "../Common/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {Button} from "@material-ui/core";

const Filters: React.FC<any> = ({
                                  orgList, isFetchingFilters, orgOid, orgName, ktl, val, requestWidgetsFromFilters,
                                  setPeriod, setOrgOid, perList, period, periodType, selectedFilters, setFiltersDefault,
                                  showFilters, orgMapList, periodNameMapList
                                }) => {
  if (!showFilters) return <></>;
  if (isFetchingFilters) return <Preloader/>;

  const acceptFilters = () => {
    requestWidgetsFromFilters(orgOid, period, periodType);
  };
  const requestSetFiltersDefault = () => {
    setFiltersDefault()
  };

  return (
    <div className={classes.filters}>
        <MenuTreeList treeList={orgList}
                      title={'оргструктура'}
                      setter={setOrgOid}
                      period={period}
                      periodType={periodType}
        />
        <MenuTreeList treeList={perList}
                      title={'период'}
                      setter={setPeriod}
                      period={period}
                      periodType={periodType}
        />
        <Button onClick={requestSetFiltersDefault}>сбросить фильтры</Button>
        <Button onClick={acceptFilters}>применить</Button>
    </div>
  )
};

export default Filters;
