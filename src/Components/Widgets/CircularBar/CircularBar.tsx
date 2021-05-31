import React from "react"
import classes from './CircularBar.module.scss'
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar: React.FC<any> = ({today, diff}) => {

  return (
    <div className={classes.graphs}>
      <CircularProgressbarWithChildren
        value={today.replace(/%/, "")}
        styles={buildStyles({
          pathColor: 'rgb(136, 132, 216)'
        })}>
        <p>сегодня</p>
        <strong style={{fontSize: '3vw'}}>{today}</strong>
        <p>{diff}</p>
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
