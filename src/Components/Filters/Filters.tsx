import React from "react";
import classes from "./Filters.module.scss";
import Datepicker from "./Filter-components/Datepicker/Datepicker";
import FilterMenuMulChBox from "./Filter-components/FilterMenuMulChBox/FilterMenuMulChBox";
import {subMonths} from "date-fns";

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

const propsFilterOrgStructure: Props = {
  title: 'Оргструктура',
  data: ["ООО ОСК ИнфоТранс",
    "РЦС Восточно-Сибирской ж.д.", "РЦС Горьковской ж.д.", "РЦС Дальневосточной ж.д.", "РЦС Забайкальской ж.д.",
    "РЦС Западно-Сибирской ж.д.", "РЦС Красноярской ж.д.", "РЦС Куйбышевской ж.д.", "РЦС Октябрьской и Калининградской ж.д.",
    "РЦС Приволжской ж.д.", "РЦС Свердловской ж.д.", "РЦС Северной ж.д.", "РЦС Северо-Кавказской ж.д.", "РЦС ЦА и Московской ж.д.",
    "РЦС Юго-Восточной ж.д.", "РЦС Южно-Уральской ж.д."]
};
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

const Filters: React.FC = () => { // !!!!! any
  return (
    <div className={classes.filters}>
      <FilterMenuMulChBox {...propsFilterOrgStructure}/>
      <Datepicker {...propsStartDate}/>
      <Datepicker {...propsEndDate}/>
      <FilterMenuMulChBox {...propsFilterDocuments}/>
      <FilterMenuMulChBox {...propsFilterValues}/>
      <FilterMenuMulChBox {...propsFilterView}/>
    </div>
  )
};

export default Filters;
