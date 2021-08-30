import React, {MouseEvent, useState} from 'react';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import {SelectedWorkersType, WorkersType} from '../../../Types/Types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu/Menu';

type PropsType = {
  workersList: WorkersType[]
  title: string
  blockedButton: boolean
  selectedWorkers: SelectedWorkersType

  acceptFilters: (type: string, selected: any) => void
  setSelectedWorkers: (selectedWorkers: SelectedWorkersType) => void
}

const useStyles = makeStyles({
  list: {
    margin: 10,
    width: 200,
  },
  menu: {
    marginTop: 90,
    marginLeft: 100,
  },
});

const MenuWorkers = ({workersList, title, acceptFilters, blockedButton, selectedWorkers, setSelectedWorkers}: PropsType) => {
  const classesMUI = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (selectedWorkers.length) {
      setAnchorEl(null);
      acceptFilters(title, selectedWorkers);
    }
  };

  const getOnChange = (event: boolean, oid: number) => {
    const newSelected = event ? selectedWorkers.concat(oid) : selectedWorkers.filter(el => el !== oid);

    setSelectedWorkers(newSelected);
  };

  return (
    <div>
      <Button aria-controls='menu'
              variant='outlined'
              onClick={handleButtonClick}
              disabled={blockedButton}
              href=''>
        {title}
      </Button>
      <Menu className={classesMUI.menu}
            id='menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
        <div className={classesMUI.list}>
          {workersList.map(el =>
            <FormControlLabel
              key={`${el.oid}${el.name}`}
              control={
                <Checkbox checked={selectedWorkers.some(item => item === el.oid)}
                          disabled={blockedButton}
                          onChange={event => getOnChange(event.target.checked, el.oid)}
                          onClick={e => e.stopPropagation()}/>}
              label={<>{el.name}</>}/>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default MenuWorkers;
