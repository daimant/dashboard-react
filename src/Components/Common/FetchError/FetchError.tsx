import React from 'react';
import classes from './FetchError.module.scss';

type PropsType = {
  hasData?: boolean
  description?: string
}

export const FetchError = ({hasData, description}: PropsType) =>
  <h3
    className={classes.fetchError}>{
    hasData
      ? 'Нет данных'
      : description
      ? description
      : 'Ошибка при загрузке'}
  </h3>;
