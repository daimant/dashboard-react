import React from "react"
import classes from './CircularBar.module.scss'
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar: React.FC<any> = ({title, today, diff}) => {
  return (
    <div className={classes.graphs}>
      <CircularProgressbarWithChildren
        value={today}
        styles={buildStyles({
          pathColor: 'rgb(136, 132, 216)'
        })}>
        <p>сегодня</p>
        <h4>{title}</h4>
        <strong style={{fontSize: '3vw'}}>{today}</strong>
        <h4>+{diff}</h4>
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
