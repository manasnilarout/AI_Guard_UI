import { Box, Typography, Paper, Alert, Button } from '@mui/material';
import { Group as TeamIcon, Add as AddIcon } from '@mui/icons-material';

export const Teams = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" component="h1">
          Teams
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled
        >
          Create Team
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Team management features are coming soon. Currently, you can manage team members within individual projects.
      </Alert>

      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <TeamIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5, color: 'text.secondary' }} />
        <Typography variant="h6" gutterBottom>
          Team Management Coming Soon
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Centralized team management will allow you to:
        </Typography>
        <Box component="ul" sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto', mb: 3 }}>
          <li>Create organization-wide teams</li>
          <li>Manage user roles and permissions</li>
          <li>Assign teams to multiple projects</li>
          <li>Monitor team activity and usage</li>
          <li>Configure team-level settings and quotas</li>
        </Box>
        <Typography variant="body2" color="text.secondary">
          For now, you can manage team members individually within each project's settings.
        </Typography>
      </Paper>
    </Box>
  );
};