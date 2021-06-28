import React from "react";
import classes from './Preloader.module.scss'

export const Preloader = ({title = 'Идет загрузка...'}) => <div className={classes.preloader}>{title}</div>;
