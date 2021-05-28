import React from "react";
import classes from "./Filters.module.scss";
import MenuMulChBox from "./Filter-components/MenuMulChBox/MenuMulChBox";
import {Preloader} from "../Common/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {Button} from "@material-ui/core";

const propsFilterDocuments = {
  title: 'Договор/КА',
  data: ["РЖД ОАО", "РЖД Центральная дирекция инфраструктуры", "РЖД-Технологии ООО", "РЖД-Медицина г. Великие Луки ЧУЗ"],
  initData: ["РЖД ОАО"]
};
const propsFilterValues = {
  title: 'Значения',
  data: ["Проценты", "Значения"],
  initValue: 'Проценты'
};
const propsFilterView = {
  title: 'Вид',
  data: ["Все данные", "Таблица с услугами", "График 1", "График 2", "График 3", "Таблица с показателми компании"],
  initData: ["Все данные", "Таблица с услугами", "График 1", "График 2", "График 3", "Таблица с показателми компании"]
};

const Filters: React.FC<any> = ({
                                  orgList, isFetchingFilters, orgOid, orgName, ktl, val, requestWidgetsFromFilters,
                                  setPeriod, setOrgOid, perList, period, periodType, selectedFilters
                                }) => {
  if (isFetchingFilters) return <Preloader/>;

  const acceptFilters = () => {
    requestWidgetsFromFilters(orgOid, period, periodType);
  };

  return (
    <div className={classes.filters}>
      {/*// @ts-ignore*/}
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
      <button className={classes.btn}>Договор/КА</button>
      <button className={classes.btn}>Значения</button>
      <button className={classes.btn}>Вид</button>
      {/*<MenuMulChBox {...propsFilterDocuments}/>*/}
      {/*<MenuMulChBox {...propsFilterValues}/>*/}
      {/*<MenuMulChBox {...propsFilterView}/>*/}
      <button className={classes.btn} onClick={acceptFilters} >применить</button>
    </div>
  )
};

export default Filters;
