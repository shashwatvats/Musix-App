import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allsources = [
  {name: 'Artists', value:'artist'},
  {name: 'Albums', value:'album'},
  {name: 'Playlists', value:'playlist'},
  {name: 'Tracks', value:'track'},
 
];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);
  const { types, handleChange } = props;


  // const handleChange = (event) => {
  //   setPersonName(event.target.value);
  // };

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(value);
  // };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Sources</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          multiple
          // disabled={disabled}
          value={types}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {allsources.map((source) => (
            <MenuItem key={source.name} value={source.value}>
              <Checkbox checked={types.indexOf(source.value) > -1} />
              <ListItemText primary={source.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      

    </div>
  );
}