import React from "react"
import classes from './CircularBar.module.scss'
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar: React.FC<any> = ({title, today, diff, err, key}) => {
  return (
    <div className={classes.graphs}>
      <CircularProgressbarWithChildren
        value={diff}
        styles={buildStyles({
          pathColor: 'rgb(136, 132, 216)'
        })}>
        {!err && <h4>{diff}%</h4>}
        <strong style={{fontSize: '3vw'}}>{today}</strong>
        {/*<h5>{title.toUpperCase()}</h5>*/}
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
