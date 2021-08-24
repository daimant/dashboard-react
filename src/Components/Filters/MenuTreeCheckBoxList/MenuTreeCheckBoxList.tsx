import React, {MouseEvent, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import {KTLType} from "../../../Types/Types";

type PropsType = {
  treeList: KTLType[]
  title: string
  blockedButton: boolean

  acceptFilters: (type: string, selected: any) => void
}

type RenderTreePropsType = {
  tree: KTLType
  classes: {}
}

const renderTree = ({tree, classes}: RenderTreePropsType) => (
  <TreeItem key={`${tree.oid}${tree.name}`}
            nodeId={tree.oid}
            label={tree.name}
            classes={classes}>
    {
      Array.isArray(tree.children)
        ? tree.children.map((nextNode: any) => renderTree({tree: nextNode, classes}))
        : null
    }
  </TreeItem>
);

const useViewStyles = makeStyles({
  root: {}
});

const useItemStyles = makeStyles(theme => ({
  root: {
    "& > .MuiTreeItem-content > .MuiTreeItem-label": {
      display: "flex",
      alignItems: "center",
      padding: "4px 0",
      background: "transparent !important",
      pointerEvents: "none"
    },
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      content: "''",
      display: "inline-block",
      width: 12,
      height: 12,
      marginRight: 8,
      border: "1px solid #ccc",
      background: "white"
    }
  },
  iconContainer: {
    marginRight: 12,
    "& > svg": {
      padding: 8,
      "&:hover": {
        opacity: 0.6
      }
    }
  },
  label: {
    padding: 0
  },
  selected: {
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      background: theme.palette.primary.main,
      border: "1px solid transparent"
    }
  }
}));

const useStyles = makeStyles({
  tree: {
    margin: '.5rem',
    height: 250,
    width: 200,
  },
  menu: {
    margin: '12.5vh 5vw',
  },
});

const MenuTreeCheckBoxList = ({treeList, title, acceptFilters, blockedButton}: PropsType) => {
  const classesView = useViewStyles();
  const classesItem = useItemStyles();
  const classesMUI = useStyles();

  const [expanded, setExpanded] = useState<string[]>(treeList.map(el => el.oid));
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggle = (event: any, nodeIds: string[]) => {
    if (event.target.nodeName !== "svg") {
      return;
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event: any, nodeIds: string[]) => {
    if (event.target.nodeName === "svg") {
      return;
    }
    const first = nodeIds[0];
    if (selected.includes(first)) {
      setSelected(selected.filter(id => id !== first));
    } else {
      setSelected([first, ...selected]);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls='menu'
              variant='outlined'
              onClick={handleClick}
              disabled={blockedButton}
              href=''>
        {title}
      </Button>
      <Menu className={classesMUI.menu}
            id='menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
      >
        <TreeView className={classesMUI.tree}
                  classes={classesView}
                  defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
                  defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
                  expanded={expanded}
                  selected={selected}
                  onNodeToggle={handleToggle}
                  onNodeSelect={handleSelect}
                  multiSelect
        >
          {treeList.map(list => renderTree({tree: list, classes: classesItem}))}
        </TreeView>
      </Menu>
    </div>
  )
};

export default MenuTreeCheckBoxList;
