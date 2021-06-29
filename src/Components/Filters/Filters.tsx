import React from 'react';
import classes from './Filters.module.scss';
import {Preloader} from '../Common/Preloader/Preloader';
import MenuTreeList from './MenuTreeList/MenuTreeList';
import {Button} from '@material-ui/core';
import {FetchError} from '../Common/FetchError/FetchError';
import {OrgListType, PeriodListType} from '../Common/Types';

type PropsType = {
  orgList: OrgListType
  altOrgList: OrgListType
  isFetchingFilters: boolean
  isFetchingWidgets: boolean
  orgOid: string
  perList: PeriodListType
  period: string
  periodType: string
  showFilters: boolean

  requestWidgetsFromFilters: (oid: string, period: string, periodType: string) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
}

const Filters: React.FC<PropsType> = props => {
  const {
    orgList, altOrgList, isFetchingFilters, isFetchingWidgets, orgOid, /*ktl, val,*/ requestWidgetsFromFilters,
    setPeriod, setOrgOid, perList, period, periodType, requestSetFiltersDefault, showFilters
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
                        altTreeList={{}}
                        title={'период'}
                        orgOid={orgOid}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
                        isFetchingWidgets={isFetchingWidgets}
          /></>
      }
      <Button variant='outlined' onClick={requestSetFiltersDefault} disabled={isFetchingWidgets} href={''}>
        сбросить фильтры
      </Button>
    </div>
  )
};

export default Filters;
