import React, {ChangeEvent, MouseEvent, useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import {KTLType, SelectedKTLType} from '../../../Types/Types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu/Menu';

type PropsType = {
  ktl: KTLType[]
  title: string
  blockedButton: boolean
  selectedKTL: SelectedKTLType

  acceptFilters: (type: string, selected: any) => void
  setSelectedKTL: (selectedKTL: SelectedKTLType) => void
}

type RenderTreePropsType = {
  tree: KTLType
  handleExpand: (event: ChangeEvent<{}>, oid: string) => void
}

const useStyles = makeStyles({
  tree: {
    margin: 10,
    height: 400,
    width: 200,
  },
  menu: {
    marginTop: 120,
    marginLeft: 100,
  },
});

const MenuKTL = ({ktl, title, acceptFilters, blockedButton, selectedKTL, setSelectedKTL}: PropsType) => {
  const classesMUI = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<string[]>(ktl.map(el => el.oid));

  const getChildById = (node: KTLType, oid: string) => {
    let array: string[] = [];

    const getAllChild = (tree: KTLType | null) => {
      if (tree === null) return [];
      array.push(tree.oid);
      if (Array.isArray(tree.children)) {
        tree.children.forEach(node => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    };

    const getNodeById = (tree: KTLType, oid: string) => {
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
    };

    return getAllChild(getNodeById(node, oid));
  };

  const getOnChange = (checked: boolean, tree: KTLType) => {
    const allNode: string[] = ktl.map(list => getChildById(list, tree.oid)).flat(1);
    let array = checked
      ? [...selectedKTL, ...allNode]
      : selectedKTL.filter(value => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelectedKTL(array);

    ktl.forEach(contragent => {
      let countCheckedChild = 0;

      contragent.children?.forEach(child => {
        if (array.includes(child.oid)) {
          countCheckedChild++;
        }
      });

      if (!countCheckedChild && array.includes(contragent.oid)) {
        setSelectedKTL(array.filter(el => el !== contragent.oid));
      } else if (countCheckedChild && !array.includes(contragent.oid)) {
        setSelectedKTL([...array, contragent.oid]);
      }
    });
  };

  const renderTree = ({tree, handleExpand}: RenderTreePropsType) => (
    <TreeItem key={tree.oid}
              nodeId={tree.oid}
              onIconClick={(event) => handleExpand(event, tree.oid)}
              label={
                <FormControlLabel label={<>{tree.name}</>}
                                  key={tree.oid}
                                  control={
                                    <Checkbox checked={selectedKTL.some(item => item === tree.oid)}
                                              disabled={blockedButton}
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
    if (selectedKTL.length) {
      setAnchorEl(null);
      acceptFilters(title, selectedKTL);
    }
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
          {ktl.map(tree => renderTree({tree, handleExpand}))}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuKTL;
