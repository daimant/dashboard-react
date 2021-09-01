import React from 'react';
import classes from './FetchError.module.scss';

type PropsType = {
  hasData?: boolean
}

export const FetchError = ({hasData}: PropsType) =>
  <h3
    className={classes.fetchError}>{hasData ? 'Нет данных' : 'Ошибка при загрузке'}
  </h3>;
