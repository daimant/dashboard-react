import React from "react";
import classes from "./Filters.module.scss";
import {Preloader} from "../Common/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {Button} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// const propsFilterDocuments = {
//   title: 'Договор/КА',
//   data: ["РЖД ОАО", "РЖД Центральная дирекция инфраструктуры", "РЖД-Технологии ООО", "РЖД-Медицина г. Великие Луки ЧУЗ"],
//   initData: ["РЖД ОАО"]
// };
// const propsFilterValues = {
//   title: 'Значения',
//   data: ["Проценты", "Значения"],
//   initValue: 'Проценты'
// };
// const propsFilterView = {
//   title: 'Вид',
//   data: ["Все данные", "Таблица с услугами", "График 1", "График 2", "График 3", "Таблица с показателми компании"],
//   initData: ["Все данные", "Таблица с услугами", "График 1", "График 2", "График 3", "Таблица с показателми компании"]
// };

const Filters: React.FC<any> = ({
                                  orgList, isFetchingFilters, orgOid, orgName, ktl, val, requestWidgetsFromFilters,
                                  setPeriod, setOrgOid, perList, period, periodType, selectedFilters, setFiltersDefault,
                                  showFilters
                                }) => {
  if (isFetchingFilters) return <Preloader/>;
  if (!showFilters) return <></>;

  const acceptFilters = () => {
    requestWidgetsFromFilters(orgOid, period, periodType);
  };

  const requestSetFiltersDefault = () => {
    setFiltersDefault()
  };

  return (
    <div className={classes.filters}>
      {/*// @ts-ignore*/}
      <div className={classes.aboutFilters}>
        <p>Выбранная организация:</p>
        <p>{orgOid}</p>
        <p>Выбранный период: {period}{periodType}</p>
      </div>
      <p></p>
      <ButtonGroup variant="text" aria-label="text primary button group">
        <MenuTreeList treeList={orgList}
                      title={'оргструктура'}
                      setter={setOrgOid}
                      period={period}
                      periodType={periodType}
        />
        {/*// @ts-ignore*/}
        <MenuTreeList treeList={perList}
                      title={'период'}
                      setter={setPeriod}
                      period={period}
                      periodType={periodType}
        />
      </ButtonGroup>

      {/*<button className={classes.btn}>Договор/КА</button>*/}
      {/*<button className={classes.btn}>Значения</button>*/}
      {/*<button className={classes.btn}>Вид</button>*/}
      <ButtonGroup variant="text" aria-label="text primary button group">
        <Button onClick={requestSetFiltersDefault}>сбросить фильтры</Button>
        <Button onClick={acceptFilters}>применить</Button>
      </ButtonGroup>

    </div>
  )
};

export default Filters;
