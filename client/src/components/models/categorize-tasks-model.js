/* eslint-disable react/prop-types */
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

const CategorizeTasksModale = ({ categorize, setCategorize }) => {

  return (
    <div>
      <FormControl sx={{ mx: 2, minWidth: 120, height: 80}}>
        <FormHelperText>Select tasks categorize</FormHelperText>
        <Select
          className='max-h-[40px]'
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={categorize}
          onChange={(e) => setCategorize(e.target.value)}
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Complete'>Complete</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default CategorizeTasksModale