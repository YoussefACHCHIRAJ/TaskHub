import { useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import Account from '../../../_mock/account';
// hooks
import { useLogout, useAuthContext } from '../../../hooks';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { auth } = useAuthContext();
  const logout = useLogout();
  const [open, setOpen] = useState(null);

  return (
    <>
      <IconButton
        onClick={(event) => setOpen(event.currentTarget)}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={Account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {auth ? auth.user.name : 'Ghost'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth ? auth.user.email : "Ghost"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={() => setOpen(null)} component={Link} to='/dashboard/profile'>
            Profile
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />


        <MenuItem onClick={logout} sx={{ m: 1 }} component={Link} to='/login'>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
