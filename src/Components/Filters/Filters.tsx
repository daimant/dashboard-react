import React from "react";
import classes from "./Filters.module.scss";
import {Preloader} from "../Common/Preloader/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {Button} from "@material-ui/core";
import {FetchError} from "../Common/FetchError/FetchError";

const Filters: React.FC<any> = props => {
  const {
    orgList, altOrgList, isFetchingFilters, isFetchingWidgets, orgOid, /*orgName, ktl, val,*/ requestWidgetsFromFilters,
    setPeriod, setOrgOid, perList, period, periodType, /*selectedFilters,*/ setFiltersDefault,
    showFilters
  } = props;

  if (!showFilters) return <></>;
  if (isFetchingFilters) return <Preloader/>;

  const acceptFilters = (type: string = 'def', selected: any = '') => {
    const [newPeriodType, newPeriod] = type === 'период' ? selected.split(":") : ['', ''];
    requestWidgetsFromFilters(
      type === 'оргструктура' ? selected : orgOid,
      type === 'период' ? newPeriod : period,
      type === 'период' ? newPeriodType : periodType
    );
  };
  const requestSetFiltersDefault = async () => {
    await setFiltersDefault();
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
                          orgOid={orgOid}
                          period={period}
                          periodType={periodType}
                          acceptFilters={acceptFilters}
                          isFetchingWidgets={isFetchingWidgets}
        />
          <MenuTreeList treeList={perList}
                        title={'период'}
                        orgOid={orgOid}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
                        isFetchingWidgets={isFetchingWidgets}
          /></>
      }
      <Button variant="outlined" onClick={requestSetFiltersDefault} disabled={isFetchingWidgets}>
        сбросить фильтры
      </Button>
    </div>
  )
};

export default Filters;
