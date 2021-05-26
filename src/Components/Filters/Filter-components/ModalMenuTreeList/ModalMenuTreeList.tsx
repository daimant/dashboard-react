import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {RenderTree} from "../../../Common/Types";
import TreeItem from "@material-ui/lab/TreeItem/TreeItem";
import {TreeView} from "@material-ui/lab";

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from "@material-ui/core/Menu/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      margin: '.5rem',
    },
  }),
);

const DialogSelect: React.FC<any> = ({treeList, title, requestWidgetsFromFilters, setPeriod, period, periodType}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Button onClick={handleClickOpen}>Open select dialog</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>

              <FormControl className={classes.formControl}>
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon/>}
                  defaultExpanded={[treeList.name]}
                  defaultExpandIcon={<ChevronRightIcon/>}
                  onNodeSelect={handleSelect}
                >
                  {renderTree(treeList)}
                </TreeView>
              </FormControl>



          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSelect;
