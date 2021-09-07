import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import {LightTooltip} from '../../Widgets/KPKTable/KPKTable';
import classes from './AboutWidget.module.scss';

const AboutWidget = ({description = '', styles = {}}) => {
  return (
    <div className={classes.icon}>
      &nbsp;
      <LightTooltip placement='right'
                    title={description}>
        <InfoIcon style={styles}
                  component={'svg'}
                  fontSize={'small'}
                  color={'disabled'}/>
      </LightTooltip>
    </div>
  )
};

export default AboutWidget;
