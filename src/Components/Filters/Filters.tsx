import React from "react";
import classes from "./Filters.module.scss";
import Datepicker from "./Filter-components/Datepicker/Datepicker";
import MenuMulChBox from "./Filter-components/MenuMulChBox/MenuMulChBox";
import {subMonths} from "date-fns";
import {Preloader} from "../Common/Preloader";
import MenuTreeList from "./Filter-components/MenuTreeList/MenuTreeList";
import {RenderTree} from "../Common/Types";

interface Props {
  title: string,
  data: string[],
  initData?: string[],
  initValue?: string,
}

interface DateProps {
  title: string,
  date: any
}

// const org_list_old: RenderTree =


const propsStartDate: DateProps = {
  title: 'Начальная дата',
  date: subMonths(new Date(), 1),
  // date: Date.now() - 30 * 24 * 60 * 60 * 1000,
};
const propsEndDate = {
  title: 'Конечная дата',
  date: new Date(Date.now()),
};
const propsFilterDocuments: Props = {
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

const Filters: React.FC<any> = ({org_list, isFetchingFilters, org_oid, org_name, fn_date, st_date, ktl, val, requestWidgetsFromFilters}) => {
  if (isFetchingFilters) return <Preloader/>;

  return (
    <div className={classes.filters}>
      {/*// @ts-ignore*/}
      <MenuTreeList org_list={org_list} requestWidgetsFromFilters={requestWidgetsFromFilters}/>
      <Datepicker {...propsStartDate}/>
      <Datepicker {...propsEndDate}/>
      <MenuMulChBox {...propsFilterDocuments}/>
      <MenuMulChBox {...propsFilterValues}/>
      <MenuMulChBox {...propsFilterView}/>
    </div>
  )
};

export default Filters;
