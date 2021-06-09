import React from "react";
import classes from "./Filters.module.scss";
import {Preloader} from "../Common/Preloader/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {Button} from "@material-ui/core";
import {FetchError} from "../Common/FetchError/FetchError";

const Filters: React.FC<any> = props => {
  const {
    orgList, altOrgList, isFetchingFilters, orgOid, /*orgName, ktl, val,*/ requestWidgetsFromFilters,
    setPeriod, setOrgOid, perList, period, periodType, /*selectedFilters,*/ setFiltersDefault,
    showFilters
  } = props;

  if (!showFilters) return <></>;
  if (isFetchingFilters) return <Preloader/>;

  const acceptFilters = () => {
    requestWidgetsFromFilters(orgOid, period, periodType);
  };
  const requestSetFiltersDefault = () => {
    setFiltersDefault();
    acceptFilters();
  };

  return (
    <div className={classes.filters}>
      {(!orgList || !orgList.oid)
        ? <FetchError/>
        : <><MenuTreeList treeList={orgList}
                          altTreeList={altOrgList}
                          title={'оргструктура'}
                          setter={setOrgOid}
                          period={period}
                          periodType={periodType}
                          acceptFilters={acceptFilters}
        />
          <MenuTreeList treeList={perList}
                        title={'период'}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
          /></>
      }
      <Button variant="outlined" onClick={requestSetFiltersDefault}>сбросить фильтры</Button>
    </div>
  )
};

export default Filters;
