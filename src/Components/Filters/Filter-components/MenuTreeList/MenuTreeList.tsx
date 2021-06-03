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
  const {treeList, title, requestWidgetsFromFilters, setter, period, periodType, altTreeList = {}} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [checked, setChecked] = React.useState(false);

  const useStyles = makeStyles({
    root: {
      margin: '.5rem',
      height: title === "оргструктура" ? 400 : 200,
      flexGrow: 1,
      width: title === "оргструктура" ? 550 : 200,
      overflow: 'auto',
    },
    menu: {
      margin: '8vh 4vw'
    }
  });

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (typeof selected !== "object")
      setter(selected);
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
            control={<Switch size="medium" checked={checked} onChange={toggleChecked} color="default"
            />}
            labelPlacement="start"
            label={`Организация выполняет ЗНО - Не важно/Да`}
        />}
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon/>}
          defaultExpanded={title === 'оргструктура' ? [treeList.oid] : ['root']}
          defaultExpandIcon={<ChevronRightIcon/>}
          onNodeSelect={handleSelect}
        >
          {!checked ? renderTree(treeList) : renderTree(altTreeList)}
        </TreeView>
      </Menu>

    </div>
  );
};

export default MenuTreeList;
