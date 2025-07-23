import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Skeleton,
} from '@mui/material';
import {
  Api as ApiIcon,
  Folder as ProjectIcon,
  Key as KeyIcon,
  Person as PersonIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ActivityItem } from '@/types/dashboard';

interface ActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'api_call':
      return ApiIcon;
    case 'project_created':
      return ProjectIcon;
    case 'key_added':
      return KeyIcon;
    case 'member_invited':
      return PersonIcon;
    case 'error':
      return ErrorIcon;
    default:
      return ApiIcon;
  }
};

const getActivityColor = (severity: ActivityItem['severity']) => {
  switch (severity) {
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    default:
      return 'primary.main';
  }
};

const getSeverityChipColor = (severity: ActivityItem['severity']) => {
  switch (severity) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

export const ActivityFeed = ({ activities, loading = false }: ActivityFeedProps) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index} divider>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width="60%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Recent Activity</Typography>
        {activities.length > 0 && (
          <Chip
            label={`${activities.length} recent`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {activities.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={4}
          color="text.secondary"
        >
          <ApiIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="body1">No recent activity</Typography>
          <Typography variant="body2">
            Activity will appear here once you start using AI Guard
          </Typography>
        </Box>
      ) : (
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {activities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <ListItem
                key={activity.id}
                divider={index < activities.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: getActivityColor(activity.severity),
                      width: 40,
                      height: 40,
                    }}
                  >
                    <IconComponent fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" fontWeight="medium">
                        {activity.title}
                      </Typography>
                      {activity.severity && activity.severity !== 'info' && (
                        <Chip
                          label={activity.severity}
                          size="small"
                          color={getSeverityChipColor(activity.severity)}
                          variant="outlined"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </Typography>
                        {activity.projectName && (
                          <>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <Typography variant="caption" color="primary.main">
                              {activity.projectName}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
};