import React, {ChangeEvent, MouseEvent, useState} from 'react';
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
  isFetchingWidgets: boolean

  setter: (oid: string) => void
  acceptFilters: (type: string, selected: any) => void
}
type RenderTreePropsType = {
  nodes: OrgListOSKType | PeriodListType | OrgListRZDType,
  handleSelect: (event: ChangeEvent<{}>, oid: string) => void,
  handleExpand: (event: ChangeEvent<{}>, oid: string) => void
}
const renderTree = ({nodes, handleSelect, handleExpand}: RenderTreePropsType) => (
  <TreeItem key={`${nodes.oid}${nodes.name}`} nodeId={nodes.oid} label={nodes.name}
            onLabelClick={(event) => {
              handleSelect(event, nodes.oid)
            }}
            onIconClick={(event) => {
              handleExpand(event, nodes.oid)
            }}>
    {
      Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree({nodes: node, handleSelect, handleExpand}))
        : null
    }
  </TreeItem>
);

const MenuTreeList = ({
                        treeList, altOrgListOSK, orgListRZD, title, orgOid, period, periodType, setter, acceptFilters,
                        isFetchingWidgets
                      }: PropsType) => {
  const [expanded, setExpanded] = useState<string[]>(title === 'период' ? [treeList.oid, ...treeList.children.map((org: any) => org.oid)] : [treeList.oid, '0']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedInfotransRZD, setCheckedInfotransRZD] = useState(localStorage.getItem('checkedInfotransRZD') === '1' || false);
  const [checkedOSKZNO, setCheckedOSKZNO] = useState(localStorage.getItem('checkedOrgZNO') === '1' || false);

  const useStyles = makeStyles({
    tree: {
      margin: '.5rem',
      height: title === 'оргструктура' ? 400 : 250,
      width: title === 'оргструктура' ? 550 : 200,
      overflow: 'auto',
    },
    menu: {
      margin: `${title === 'оргструктура' ? '8vh' : '14vh'} ${title === 'оргструктура' ? '6.5vw' : '4vw'}`,
    },
    toggle: {
      '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#52d869'
      },
    },
    selectParams: {
      height: '76px',
      display: 'flex',
      flexDirection: 'column',
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
    if (nodeIds && typeof nodeIds !== 'object')
      setter(nodeIds);

    if ((nodeIds && title === 'оргструктура' && nodeIds !== orgOid) || (nodeIds && title === 'период' && nodeIds !== `${periodType}:${period}`))
      acceptFilters(title, nodeIds);

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

  const classes = useStyles();

  return (
    <div>
      <Button aria-controls='menu' variant='outlined' onClick={handleClick} disabled={isFetchingWidgets}
              href={''}>
        {title}
      </Button>
      <Menu
        className={classes.menu}
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
                                 className={classes.toggle}
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
                                 className={classes.toggle}
                />}
                labelPlacement='start'
                label={`Все организации / Организации выполняющие ЗНО`}
            />}
          </span>
        </div>}
        <TreeView
          className={classes.tree}
          defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
          defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
          expanded={expanded}
        >
          {title === 'оргструктура'
            ? (checkedInfotransRZD// @ts-ignore хз как чинить
                ? renderTree({nodes: orgListRZD, handleSelect, handleExpand})// @ts-ignore хз как чинить
                : renderTree({nodes: (checkedOSKZNO ? altOrgListOSK : treeList), handleSelect, handleExpand})
            )
            : renderTree({nodes: treeList, handleSelect, handleExpand})}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeList;
