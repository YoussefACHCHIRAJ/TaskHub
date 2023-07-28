import { useState } from 'react';
import { Typography, IconButton, Collapse, TableRow, TableCell, Box, Stack } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Iconify from '../iconify/Iconify';

const Row = (props) => {
    const { row, handleOpenMenu } = props;
    const [open, setOpen] = useState(false);
    console.log('row:', row);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.start}</TableCell>
                <TableCell align="center">{row.due}</TableCell>
                <TableCell align="center">
                    <IconButton size="md" color="inherit" onClick={e => handleOpenMenu(e, row.id)}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Stack>
                                <Typography variant="h6" gutterBottom component="div">
                                    Description
                                </Typography>
                                <Typography variant="body2" gutterBottom component="p">
                                    {row.description}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6" gutterBottom component="div">
                                    responsables
                                </Typography>
                                {row.responsables.map((respo, index) => (
                                    <Typography key={index} variant="body2" gutterBottom component="p">
                                        {respo}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Row;