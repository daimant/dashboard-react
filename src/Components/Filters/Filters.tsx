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
                                  orgList,
                                  isFetchingFilters,
                                  orgOid,
                                  orgName,
                                  // fnDate,
                                  // stDate,
                                  ktl,
                                  val,
                                  requestWidgetsFromFilters,
                                  setPeriod,
                                  perList, period, periodType
                                }) => {
  if (isFetchingFilters) return <Preloader/>;

  return (
    <div className={classes.filters}>
      {/*// @ts-ignore*/}
      <MenuTreeList treeList={orgList}
                    title={'Оргструктура'}
                    requestWidgetsFromFilters={requestWidgetsFromFilters}
                    setPeriod={setPeriod}
                    period={period}
                    periodType={periodType}/>
      {/*// @ts-ignore*/}
      <MenuTreeList treeList={perList}
                    title={'Период'}
                    requestWidgetsFromFilters={requestWidgetsFromFilters}
                    setPeriod={setPeriod}
                    period={period}
                    periodType={periodType}/>
      {/*// @ts-ignore*/}
      {/*<Datepicker date={stDate} title={'Начальная дата'} setDate={setDate}/>*/}
      {/*// @ts-ignore*/}
      {/*<Datepicker date={fnDate} title={'Конечная дата'} setDate={setDate}/>*/}
      <MenuMulChBox {...propsFilterDocuments}/>
      <MenuMulChBox {...propsFilterValues}/>
      <MenuMulChBox {...propsFilterView}/>
    </div>
  )
};

export default Filters;
