import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { socket } from '../../../App';
import { useAuthContext, useGetNotifications, useUpdateNotification } from '../../../hooks';

// ----------------------------------------------------------------------


export default function NotificationsPopover() {

  const { auth } = useAuthContext();

  const queryClient = useQueryClient();

  const [notifications, setNotifications] = useState([]);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const { data: loadedNotification, isLoading, refetch: refetchNotification } = useGetNotifications()

  const {mutate: updateNotification } = useUpdateNotification();

  const [open, setOpen] = useState(null);

  useEffect(() => {
    socket.on("refetch-notifications", () => {
      console.log("re-loads notifications...")
      queryClient.invalidateQueries(["get notifications", auth?.user?._id])
    });
    return () => {
      socket.off("refetch-notifications");
    }
  }, [notifications, refetchNotification]);

  useEffect(() => {
    if (isLoading) console.log("loading notifications...");
    else if(loadedNotification) {
        setNotifications(loadedNotification);
    }
  }, [isLoading, loadedNotification])
  console.log({notifications});

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
    updateNotification();
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications?.map((notification) => (
              <NotificationItem key={notification?._id} notification={notification} />
            ))}
          </List>

        </Scrollbar>

      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    notification: PropTypes.object
  }),
};

function NotificationItem({ notification }) {
  const title = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification?.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification?.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  return (
    <Typography variant="subtitle2" className="flex flex-col">
      New Task add
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; Task  title: {notification?.notification?.task?.title}
      </Typography>
    </Typography>
  );

}
