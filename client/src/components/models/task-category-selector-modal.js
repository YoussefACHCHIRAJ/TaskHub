import React from 'react'

import { 
  FormHelperText,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

function TaskCategorySelectorModal({ category, setCategory }) {

  return (
    <div>
      <FormControl sx={{ mx: 2, minWidth: 120, height: 80}}>
        <FormHelperText>Select tasks categorize</FormHelperText>
        <Select
          className='max-h-[40px]'
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

export default TaskCategorySelectorModal