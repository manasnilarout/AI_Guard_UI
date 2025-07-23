import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { apiClient } from '@/services/api';

export const ApiDebug = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [testUrl, setTestUrl] = useState('/_api/health');

  const testApiCall = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test a simple GET request
      const response = await apiClient.get(testUrl);
      setResult(response);
    } catch (err: any) {
      console.error('API Debug Error:', err);
      setError(JSON.stringify(err.response?.data || err.message, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testDashboardStats = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiClient.get('/_api/dashboard/stats');
      setResult(response);
    } catch (err: any) {
      console.error('Dashboard API Error:', err);
      setError(JSON.stringify(err.response?.data || err.message, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        API Debug Panel
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current API Configuration
        </Typography>
        <Typography variant="body2">
          Base URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}
        </Typography>
        <Typography variant="body2">
          Timeout: {import.meta.env.VITE_API_TIMEOUT || '30000'}ms
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Test Custom Endpoint
        </Typography>
        <TextField
          fullWidth
          label="API Endpoint"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="/_api/health"
        />
        <Button
          variant="contained"
          onClick={testApiCall}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? 'Testing...' : 'Test API Call'}
        </Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Test Dashboard API
        </Typography>
        <Button
          variant="contained"
          onClick={testDashboardStats}
          disabled={loading}
          color="secondary"
        >
          {loading ? 'Testing...' : 'Test Dashboard Stats'}
        </Button>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Error Response:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {error}
          </pre>
        </Alert>
      )}

      {result && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="h6">Success Response:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </Alert>
      )}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Debug Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            1. Open your browser's Developer Tools (F12)
          </Typography>
          <Typography variant="body2" paragraph>
            2. Go to the Network tab
          </Typography>
          <Typography variant="body2" paragraph>
            3. Click "Test API Call" to see if the X-AI-Guard-Provider header is being sent
          </Typography>
          <Typography variant="body2" paragraph>
            4. Check the Console tab for any debug logs from the API client
          </Typography>
          <Typography variant="body2">
            5. If you see CORS errors, make sure your AI Guard server allows requests from this origin
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};