import React from 'react';
import classes from './CircularBar.module.scss';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type PropsType = {
  today: number
  diff: number
  err: boolean
}

const CircularBar = ({today, diff, err}: PropsType) => {
  return (
    <div className={classes.graphs}>
      <CircularProgressbarWithChildren
        value={diff}
        styles={buildStyles({
          pathColor: 'rgb(136, 132, 216)'
        })}>
        {!err && <h4>{today}</h4>}
        <strong>{diff}%</strong>
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
