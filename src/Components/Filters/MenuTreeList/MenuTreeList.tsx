import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
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
import {OrgListOSKType, OrgListRZDType} from '../../../Types/Types';
import AboutWidget from '../../Common/AboutWidget/AboutWidget';

type PropsType = {
  treeList: any
  altOrgListOSK?: OrgListOSKType | {}
  orgListRZD?: OrgListRZDType | {}
  title: string
  orgOid?: string
  period?: string
  periodType?: string
  blockedButton: boolean
  switchSDAWHIT: boolean
  selectedFilter: string

  setter?: (oid: string) => void
  acceptFilters: (type: string, selected: any) => void
}

type RenderTreePropsType = {
  tree: any
  switchSDAWHIT: boolean

  handleSelect: (event: ChangeEvent<{}>, oid: string) => void
  handleExpand: (event: ChangeEvent<{}>, oid: string) => void
}

const renderTree = ({tree, handleSelect, handleExpand, switchSDAWHIT}: RenderTreePropsType) => (
  <TreeItem key={`${tree.oid}${tree.name}`}
            nodeId={tree.oid}
            label={tree.name}
            onLabelClick={(event) => {
              if (!switchSDAWHIT || (!tree.oid.includes('q') && !tree.oid.includes('y'))) return handleSelect(event, tree.oid)
            }}
            onIconClick={(event) => handleExpand(event, tree.oid)}>
    {
      Array.isArray(tree.children)
        ? tree.children.map((nextNode: any) => renderTree({tree: nextNode, handleSelect, handleExpand, switchSDAWHIT}))
        : null
    }
  </TreeItem>
);

const useStylesCommon = makeStyles({
  toggle: {
    '& .Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#e21a1a',
      opacity: 1,
    },
  },
});

const SwitchGroup = ({changer, checked, description}: { changer: () => void, checked: boolean, description: string }) => {
  const classesMUISwitchGroup = useStylesCommon();

  return <FormControlLabel
    control={<Switch size='medium'
                     checked={checked}
                     onChange={changer}
                     color='default'
                     className={classesMUISwitchGroup.toggle}
    />}
    labelPlacement='start'
    label={description}
  />
};

const MenuTreeList = ({
                        treeList, altOrgListOSK, orgListRZD, title, orgOid, period, periodType, setter, acceptFilters,
                        blockedButton, switchSDAWHIT, selectedFilter
                      }: PropsType) => {

  useEffect(() => {
    if (switchSDAWHIT) {
      setCheckedOSKRZD(true);
    } else {
      setCheckedOSKRZD(false);
    }
  }, [switchSDAWHIT]);

  const [expanded, setExpanded] = useState<string[]>(title === 'период' && Array.isArray(treeList)
    ? treeList.map((el: any) => el.oid)
    : [treeList.oid, '0']
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedOSKRZD, setCheckedOSKRZD] = useState(localStorage.getItem('checkedOSKRZD') === 'true');
  const [checkedOSKZNO, setCheckedOSKZNO] = useState(localStorage.getItem('checkedOSKZNO') !== 'false');

  const useStyles = makeStyles({
    tree: {
      transform: title === 'оргструктура' && checkedOSKRZD && !switchSDAWHIT ? 'translate(0, -10%)' : '',
      margin: '0 15px',
      height: title === 'оргструктура' ? 400 : '',
      width: title === 'оргструктура' ? 570 : '',
      overflow: title === 'оргструктура' && checkedOSKRZD ? 'none' : 'auto',
    },
  });

  const toggleCheckedOSKRZD = () => {
    localStorage.setItem('checkedOSKRZD', `${!checkedOSKRZD}`);
    setCheckedOSKRZD(!checkedOSKRZD);
  };

  const toggleCheckedOSKZNO = () => {
    localStorage.setItem('checkedOSKZNO', `${!checkedOSKZNO}`);
    setCheckedOSKZNO(!checkedOSKZNO);
  };

  const handleSelect = (event: ChangeEvent<{}>, nodeIds: string) => {
    if (nodeIds && typeof nodeIds !== 'object') {
      setter!(nodeIds);
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
              href=''
              size='small'>
        {title}: {selectedFilter.length <= 30 ? selectedFilter : `${selectedFilter.slice(0, 30)}...`}
      </Button>
      <Menu getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            id='menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
      >
        {!switchSDAWHIT && title === 'оргструктура' &&
        <div className={classes.selectParams}>
          <span className={classes.headOrgTree}>
            <SwitchGroup changer={toggleCheckedOSKRZD}
                         checked={checkedOSKRZD}
                         description={`Оргструктура Инфотранс / Полигон ЖД`}/>
            <AboutWidget description={'Фильтр по орстуктуре, позволяет отобрать исполнителя заявки по подразделению. ' +
            'При переключении в «РЖД» фильтрация происходит по инициатору.'}
                         styles={{marginRight: '7px'}}/>
          </span>
            <span>
            {!checkedOSKRZD &&
            <SwitchGroup changer={toggleCheckedOSKZNO}
                         checked={checkedOSKZNO}
                         description={`Все подразделения / Только подразделения выполняющие запросы`}/>}
          </span>
        </div>}
        <TreeView className={classesMUI.tree}
                  defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
                  defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
                  expanded={expanded}
        >
          {title === 'оргструктура'
            ? (checkedOSKRZD
                ? renderTree({tree: orgListRZD, handleSelect, handleExpand, switchSDAWHIT})
                : renderTree({
                  tree: (checkedOSKZNO ? altOrgListOSK : treeList),
                  handleSelect,
                  handleExpand,
                  switchSDAWHIT
                })
            )
            : Array.isArray(treeList)
              ? treeList.map(list => renderTree({tree: list, handleSelect, handleExpand, switchSDAWHIT}))
              : renderTree({tree: treeList, handleSelect, handleExpand, switchSDAWHIT})}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeList;
