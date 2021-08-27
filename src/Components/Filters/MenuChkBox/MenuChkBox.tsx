import React, {ChangeEvent, MouseEvent, useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import {KTLType, WorkersType} from '../../../Types/Types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu/Menu';

type PropsType = {
  workersList: WorkersType[]
  title: string
  blockedButton: boolean

  acceptFilters: (type: string, selected: any) => void
}

const useStyles = makeStyles({
  list: {
    margin: '.5rem',
    height: 250,
    width: 200,
  },
  menu: {
    margin: '12.5vh 5vw',
  },
});

const MenuChkBox = ({workersList, title, acceptFilters, blockedButton}: PropsType) => {
  const classesMUI = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string[]>(workersList.map(el => el.oid));
  const [expanded, setExpanded] = useState<string[]>(selected);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpand = (event: ChangeEvent<{}>, nodeIds: string) => {
    const newExpanded = expanded.includes(nodeIds)
      ? expanded.filter((el: string) => el !== nodeIds)
      : [...expanded, nodeIds];

    setExpanded(newExpanded);
  };

  // function getOnChange(checked: boolean, tree: KTLType) {
  //   const allNode: string[] = workersList.map(list => getChildById(list, tree.oid)).flat(1);
  //   let array = checked
  //     ? [...selected, ...allNode]
  //     : selected.filter(value => !allNode.includes(value));
  //
  //   array = array.filter((v, i) => array.indexOf(v) === i);
  //
  //   setSelected(array);
  //   acceptFilters(title, array);
  // }
  const getOnChange = (event: boolean, oid: number) => {

  }

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
                <Checkbox checked={selected.some(item => item === el.oid)}
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

export default MenuChkBox;
