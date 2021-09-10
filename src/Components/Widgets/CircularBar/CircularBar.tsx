import React from 'react';
import classes from './CircularBar.module.scss';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type PropsType = {
  today: number
  diff: number
  err: boolean
  title: string
}

const CircularBar = ({today, diff, err, title}: PropsType) => {
  return (
    <div className={classes.graphs}>
      <CircularProgressbarWithChildren
        value={diff}
        styles={buildStyles({
          pathColor: '#2D6AA3'
        })}>
        {err
          ? <h5>{title}</h5>
          : <>
            <h4>{today}</h4>
            <strong>{diff}%</strong>
          </>}
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
