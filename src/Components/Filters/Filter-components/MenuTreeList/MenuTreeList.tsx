import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {RenderTree} from "../../../Common/Types";

const useStyles = makeStyles({
  root: {
    margin: '.5rem',
  },
});

const MenuTreeList: React.FC<any> = ({treeList, title, requestWidgetsFromFilters}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    requestWidgetsFromFilters(selected); //переделать
  };

  const classes = useStyles();

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={+nodes.oid} nodeId={nodes.oid} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon/>}
          defaultExpanded={[treeList.name]}
          defaultExpandIcon={<ChevronRightIcon/>}
          onNodeSelect={handleSelect}
        >
          {renderTree(treeList)}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeList;
