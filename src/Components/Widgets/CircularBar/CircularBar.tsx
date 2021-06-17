import React from "react"
import classes from './CircularBar.module.scss'
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar: React.FC<any> = ({today, diff, err}) => {
  console.log(window.innerWidth)
  return (
    <div className={classes.graphs} style={window.innerWidth > 2000 ? {maxWidth: '8vw'} : {}}>
      <CircularProgressbarWithChildren
        value={diff}
        styles={buildStyles({
          pathColor: 'rgb(136, 132, 216)'
        })}>
        {!err && <h4>{diff}%</h4>}
        <strong style={{fontSize: '6vh'}}>{today}</strong>
      </CircularProgressbarWithChildren>
    </div>
  )
};

export default CircularBar;
