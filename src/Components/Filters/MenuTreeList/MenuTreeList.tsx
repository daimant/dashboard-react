import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {OrgListType, PeriodListType} from '../../Common/Types';

type PropsType = {
  treeList: OrgListType | PeriodListType
  altTreeList: OrgListType | {}
  title: string
  orgOid: string
  period: string
  periodType: string
  isFetchingWidgets: boolean

  setter: (oid: string) => void
  acceptFilters: (type: string, selected: any) => void
}
const TEMPTreeListRZD = {
  children: [
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Дальневосточная ж.д.",
      oid: "281586771165001",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Забайкальская ж.д.",
      oid: "281586771165002",
      parent: "281586771165315",
      zno: 1,
    },
    {
      children: [],
      name: "Октябрьская ж.д.",
      oid: "281586771165003",
      parent: "281586771165315",
      zno: 1,
    }
  ],
  name: "ОАО РЖД",
  oid: "281586771165315",
  parent: "0",
  zno: 1,
};

const MenuTreeList: React.FC<PropsType> = ({
                                             treeList, title, orgOid, period, periodType, setter, acceptFilters,
                                             altTreeList, isFetchingWidgets
                                           }) => {
  // @ts-ignore
  const [expanded, setExpanded] = React.useState<string[]>(title === 'период' ? [treeList.oid, ...treeList.children.map((org: any) => org.oid)] : [treeList.oid]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [checkedInfotransRZD, setCheckedInfotransRZD] = React.useState(localStorage.getItem('checkedInfotransRZD') === '1' || false);
  const [checkedOSKZNO, setCheckedOSKZNO] = React.useState(localStorage.getItem('checkedOrgZNO') === '1' || false);

  const useStyles = makeStyles({
    tree: {
      margin: '.5rem',
      height: title === 'оргструктура' ? 400 : 250,
      width: title === 'оргструктура' ? 550 : 200,
      overflow: 'auto',
    },
    menu: {
      margin: `${title === 'оргструктура' ? '8vh' : '4vh'} ${title === 'оргструктура' ? '6.5vw' : '4vw'}`,
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

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    if (nodeIds && typeof nodeIds !== 'object')
      setter(nodeIds);

    if ((nodeIds && title === 'оргструктура' && nodeIds !== orgOid) || (nodeIds && title === 'период' && nodeIds !== `${periodType}:${period}`))
      acceptFilters(title, nodeIds);

    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpand = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    const newExpanded = expanded.includes(nodeIds)
      ? expanded.filter((el: string) => el !== nodeIds)
      : [...expanded, nodeIds];

    setExpanded(newExpanded);
  };

  const classes = useStyles();

  const renderTree = (nodes: OrgListType | PeriodListType) => (
    <TreeItem key={nodes.oid} nodeId={nodes.oid} label={nodes.name}
              onLabelClick={(event) => {
                handleSelect(event, nodes.oid)
              }}
              onIconClick={(event) => {
                handleExpand(event, nodes.oid)
              }}>
      {
        Array.isArray(nodes.children)
          ? nodes.children.map((node: any) => renderTree(node)) // что-то надо придумать
          : null
      }
    </TreeItem>
  );

  return (
    <div>
      <Button aria-controls='simple-menu' variant='outlined' onClick={handleClick} disabled={isFetchingWidgets}
              href={''}>
        {title}
      </Button>
      <Menu
        className={classes.menu}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.selectParams}>
          <span>
            {title === 'оргструктура' &&
            <FormControlLabel
                control={<Switch size='medium'
                                 checked={checkedInfotransRZD}
                                 onChange={toggleCheckedInfotransRZD}
                                 color='default'
                                 className={classes.toggle}
                />}
                labelPlacement='start'
                label={`Оргструктура Инфотранс / РЖД`}
            />}
          </span>
          <span>
            {title === 'оргструктура' && !checkedInfotransRZD &&
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
        </div>
        <TreeView
          className={classes.tree}
          defaultCollapseIcon={<ExpandMoreIcon component={'svg'}/>}
          defaultExpandIcon={<ChevronRightIcon component={'svg'}/>}
          expanded={expanded}
        >
          {title === 'оргструктура'
            ? (checkedInfotransRZD
              ? renderTree(TEMPTreeListRZD)
              : (checkedOSKZNO  // @ts-ignore хз как чинить
                  ? renderTree(altTreeList)
                  : renderTree(treeList)
              ))
            : renderTree(treeList)}
        </TreeView>
      </Menu>
    </div>
  );
};

export default MenuTreeList;
