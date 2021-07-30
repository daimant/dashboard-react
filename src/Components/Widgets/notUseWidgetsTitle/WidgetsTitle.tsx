import React from 'react';
import classes from './WidgetsTitle.module.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const WidgetsTitle = ({widgetsTitle}: any) => {
  return (
    <div className={classes.titleContainer}>
      <p className={classes.title}>{widgetsTitle}</p>
      <AccountCircleIcon/>
    </div>
  )
};

export default WidgetsTitle;
