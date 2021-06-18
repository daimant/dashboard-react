import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {RenderTree} from "../../../Common/Types";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const MenuTreeList: React.FC<any> = props => {
  const {
    treeList, title,  orgOid, period, periodType, setter, acceptFilters, altTreeList = {}, isFetchingWidgets
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<string>('');
  const [checked, setChecked] = React.useState(localStorage.getItem('checkedOrgZNO') === "1" || false);

  const useStyles = makeStyles({
    root: {
      margin: '.5rem',
      height: title === "оргструктура" ? 400 : 200,
      flexGrow: 1,
      width: title === "оргструктура" ? 550 : 200,
      overflow: 'auto',
    },
    menu: {
      margin: `${title === 'оргструктура' ? '4vh' : '9vh'} ${title === 'оргструктура' ? '6vw' : '4vw'}`,
    },
    toggle: {
      '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#52d869'
      },
    },
  });

  const toggleChecked = () => {
    localStorage.setItem('checkedOrgZNO', checked ? "0" : '1');
    setChecked(!checked);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    setSelected(nodeIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (selected && typeof selected !== "object")
      setter(selected);

    if ((selected && title === 'оргструктура' && selected !== orgOid) || (selected && title === 'период' && selected !== `${periodType}:${period}`))
      acceptFilters(title, selected);
  };

  const classes = useStyles();

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.oid} nodeId={nodes.oid} label={nodes.name}>
      {
        Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null
      }
    </TreeItem>
  );

  return (
    <div>
      <Button aria-controls="simple-menu" variant="outlined" onClick={handleClick} disabled={isFetchingWidgets}>
        {title}
      </Button>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {title === 'оргструктура' &&
        <FormControlLabel
            control={<Switch size="medium"
                             checked={checked}
                             onChange={toggleChecked}
                             color="default"
                             className={classes.toggle}
            />}
            labelPlacement="start"
            label={`Все организации / Организации выполняющие ЗНО`}
        />}
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon/>}
          defaultExpanded={title === 'оргструктура' ? [treeList.oid] : ['root']}
          defaultExpandIcon={<ChevronRightIcon/>}
          onNodeSelect={handleSelect}
        >
          {title === 'оргструктура' ? (!checked ? renderTree(treeList) : renderTree(altTreeList)) : renderTree(treeList)}
        </TreeView>
      </Menu>

    </div>
  );
};

export default MenuTreeList;
