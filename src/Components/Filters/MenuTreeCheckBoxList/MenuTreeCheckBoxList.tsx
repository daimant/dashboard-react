import React, {ChangeEvent, MouseEvent, useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import {KTLType} from '../../../Types/Types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu/Menu';

type PropsType = {
  treeList: KTLType[]
  title: string
  blockedButton: boolean
  selectedKTL: string[]

  acceptFilters: (type: string, selected: any) => void
  setSelectedKTL: (selected: string[]) => void
}

type RenderTreePropsType = {
  tree: KTLType
  handleExpand: (event: ChangeEvent<{}>, oid: string) => void
}

const useStyles = makeStyles({
  tree: {
    margin: '.5rem',
    height: 400,
    width: 200,
  },
  menu: {
    margin: '12.5vh 5vw',
  },
});

const MenuTreeCheckBoxList = ({treeList, title, acceptFilters, blockedButton}: PropsType) => {
  const classesMUI = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string[]>(treeList     // @ts-ignore
    .map(list => [list.oid, ...list.children.map(child => child.oid)])
    .flat(1));
  const [expanded, setExpanded] = useState<string[]>(treeList.map(el => el.oid));

  function getChildById(node: KTLType, oid: string) {
    let array: string[] = [];

    function getAllChild(tree: KTLType | null) {
      if (tree === null) return [];
      array.push(tree.oid);
      if (Array.isArray(tree.children)) {
        tree.children.forEach(node => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(tree: KTLType, oid: string) {
      if (tree.oid === oid) {
        return tree;
      } else if (Array.isArray(tree.children)) {
        let result = null;
        tree.children.forEach(node => {
          if (!!getNodeById(node, oid)) {
            result = getNodeById(node, oid);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, oid));
  }

  function getOnChange(checked: boolean, tree: KTLType) {
    const allNode: string[] = treeList.map(list => getChildById(list, tree.oid)).flat(1);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter(value => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
    acceptFilters(title, array);
  }

  const renderTree = ({tree, handleExpand}: RenderTreePropsType) => (
    <TreeItem key={tree.oid}
              nodeId={tree.oid}
              onIconClick={(event) => handleExpand(event, tree.oid)}
              label={
                <FormControlLabel label={<>{tree.name}</>}
                                  key={tree.oid}
                                  control={
                                    <Checkbox checked={selected.some(item => item === tree.oid)}
                                              onChange={event => getOnChange(event.currentTarget.checked, tree)}
                                              onClick={e => e.stopPropagation()}/>
                                  }/>
              }>
      {Array.isArray(tree.children)
        ? tree.children.map(nextNode => renderTree({tree: nextNode, handleExpand}))
        : null}
    </TreeItem>
  );

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
        <TreeView className={classesMUI.tree}
                  defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
                  defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
                  expanded={expanded}>
          {treeList.map(tree => renderTree({tree, handleExpand}))}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeCheckBoxList;
