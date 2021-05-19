import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import classess from './FilterMenuMulChBox.module.scss'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


interface Props {
  title: string,
  data: string[],
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '15vw',
      maxWidth: '15vw',
    },
    formContainer: {
      marginTop: '1.3rem',
    },
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
  }),
);
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      maxWidth: 500,
    },
  },
};

const FilterMenuMulChBox: React.FC<Props> = props => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([props.data[0]]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div className={classes.formContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label" shrink={true}>{props.title}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input/>}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {/*{props.data.map((name) => (*/}
          {/*  <MenuItem key={name} value={name} className={classess.menuChkBox}>*/}
          {/*    <Checkbox checked={personName.indexOf(name) > -1}/>*/}
          {/*    <ListItemText primary={name}/>*/}
          {/*  </MenuItem>*/}
          {/*))}*/}
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
          >
            <TreeItem nodeId="1" label="Applications">
              <TreeItem nodeId="2" label="Calendar"/>
              <TreeItem nodeId="3" label="Chrome"/>
              <TreeItem nodeId="4" label="Webstorm"/>
            </TreeItem>
            <TreeItem nodeId="5" label="Documents">
              <TreeItem nodeId="10" label="OSS"/>
              <TreeItem nodeId="6" label="Material-UI">
                <TreeItem nodeId="7" label="src">
                  <TreeItem nodeId="8" label="index.js"/>
                  <TreeItem nodeId="9" label="tree-view.js"/>
                  <TreeItem nodeId="11" label="index.js"/>
                  <TreeItem nodeId="12" label="tree-view.js"/>
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterMenuMulChBox;
