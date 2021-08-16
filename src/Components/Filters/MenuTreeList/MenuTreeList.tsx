import React, {ChangeEvent, MouseEvent, useState} from 'react';
import classes from './MenuTreeList.module.scss';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {OrgListOSKType, OrgListRZDType, PeriodListType} from '../../../Types/Types';

type PropsType = {
  treeList: OrgListOSKType | PeriodListType
  altOrgListOSK: OrgListOSKType | {}
  orgListRZD: OrgListRZDType | {}
  title: string
  orgOid: string
  period: string
  periodType: string
  blockedButton: boolean

  setter: (oid: string) => void
  acceptFilters: (type: string, selected: any) => void
}

type RenderTreePropsType = {
  tree: OrgListOSKType | PeriodListType | OrgListRZDType,
  handleSelect: (event: ChangeEvent<{}>, oid: string) => void,
  handleExpand: (event: ChangeEvent<{}>, oid: string) => void
}

const renderTree = ({tree, handleSelect, handleExpand}: RenderTreePropsType) => (
  <TreeItem key={`${tree.oid}${tree.name}`}
            nodeId={tree.oid}
            label={tree.name}
            onLabelClick={(event) => {
              handleSelect(event, tree.oid)
            }}
            onIconClick={(event) => {
              handleExpand(event, tree.oid)
            }}>
    {
      Array.isArray(tree.children)
        ? tree.children.map((nextNode: any) => renderTree({tree: nextNode, handleSelect, handleExpand}))
        : null
    }
  </TreeItem>
);

const MenuTreeList = ({
                        treeList, altOrgListOSK, orgListRZD, title, orgOid, period, periodType, setter, acceptFilters,
                        blockedButton
                      }: PropsType) => {
  const [expanded, setExpanded] = useState<string[]>(title === 'период'
    ? [treeList.oid, ...treeList.children.map((org: any) => org.oid)]
    : [treeList.oid, '0']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedInfotransRZD, setCheckedInfotransRZD] = useState(localStorage.getItem('checkedInfotransRZD') === '1' || false);
  const [checkedOSKZNO, setCheckedOSKZNO] = useState(localStorage.getItem('checkedOrgZNO') === '1' || false);

  const useStyles = makeStyles({
    tree: {
      transform: title === 'оргструктура' && checkedInfotransRZD ? 'translate(0, -10%)' : '',
      margin: '.5rem',
      height: title === 'оргструктура' ? 400 : 250,
      width: title === 'оргструктура' ? 550 : 200,
      overflow: title === 'оргструктура' && checkedInfotransRZD ? 'none' : 'auto',
    },
    menu: {
      margin: `${title === 'оргструктура' ? '8vh' : '14vh'} ${title === 'оргструктура' ? '6.5vw' : '4vw'}`,
    },
    toggle: {
      '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#52d869'
      },
    },
  });

  const toggleCheckedInfotransRZD = () => {
    localStorage.setItem('checkedInfotransRZD', checkedInfotransRZD ? '0' : '1');
    setCheckedInfotransRZD(!checkedInfotransRZD);
  };

  const toggleCheckedOSKZNO = () => {
    localStorage.setItem('checkedOrgZNO', checkedOSKZNO ? '0' : '1');
    setCheckedOSKZNO(!checkedOSKZNO);
  };

  const handleSelect = (event: ChangeEvent<{}>, nodeIds: string) => {
    if (nodeIds && typeof nodeIds !== 'object') {
      setter(nodeIds);
    }

    if ((nodeIds && title === 'оргструктура' && nodeIds !== orgOid) || (nodeIds && title === 'период' && nodeIds !== `${periodType}:${period}`)) {
      acceptFilters(title, nodeIds);
    }

    handleClose();
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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

  const classesMUI = useStyles();

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
        {title === 'оргструктура' && <div className={classes.selectParams}>
          <span>
            <FormControlLabel
                control={<Switch size='medium'
                                 checked={checkedInfotransRZD}
                                 onChange={toggleCheckedInfotransRZD}
                                 color='default'
                                 className={classesMUI.toggle}
                />}
                labelPlacement='start'
                label={`Оргструктура Инфотранс / РЖД`}
            />
          </span>
            <span>
            {!checkedInfotransRZD &&
            <FormControlLabel
                control={<Switch size='medium'
                                 checked={checkedOSKZNO}
                                 onChange={toggleCheckedOSKZNO}
                                 color='default'
                                 className={classesMUI.toggle}
                />}
                labelPlacement='start'
                label={`Все организации / Организации выполняющие ЗНО`}
            />}
          </span>
        </div>}
        <TreeView className={classesMUI.tree}
                  defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
                  defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
                  expanded={expanded}
        >
          {title === 'оргструктура'
            ? (checkedInfotransRZD// @ts-ignore хз как чинить
                ? renderTree({tree: orgListRZD, handleSelect, handleExpand})// @ts-ignore хз как чинить
                : renderTree({tree: (checkedOSKZNO ? altOrgListOSK : treeList), handleSelect, handleExpand})
            )
            : renderTree({tree: treeList, handleSelect, handleExpand})}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeList;
