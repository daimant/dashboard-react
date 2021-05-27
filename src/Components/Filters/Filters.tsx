import React from "react";
import classes from "./Filters.module.scss";
import MenuMulChBox from "./Filter-components/MenuMulChBox/MenuMulChBox";
import {Preloader} from "../Common/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";

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
      <button className={classes.btn} onClick={acceptFilters} >пименить фильтры</button>
      <MenuTreeList treeList={orgList}
                    title={'Оргструктура'}
                    setter={setOrgOid}
                    period={period}
                    periodType={periodType}
      />
      {/*// @ts-ignore*/}
      <MenuTreeList treeList={perList}
                    title={'Период'}
                    setter={setPeriod}
                    period={period}
                    periodType={periodType}
      />
      <MenuMulChBox {...propsFilterDocuments}/>
      <MenuMulChBox {...propsFilterValues}/>
      <MenuMulChBox {...propsFilterView}/>
    </div>
  )
};

export default Filters;
