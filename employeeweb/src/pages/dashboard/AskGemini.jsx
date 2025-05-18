import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import './AskGemini.css'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#black',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d81b60',
    },
  },
});

function Email() { 
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("https://email-assist-4.onrender.com/api/email/generate", {
       emailContent,
       tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Container maxWidth="md" sx={{ py: 4, backgroundColor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Typography variant='h3' component="h1" gutterBottom>
          <div className="content">
            <p>Doctor AI</p>
          </div>
        </Typography>

        <Box sx={{ mx: 3 }}>
          <TextField 
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Ask your doctor"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2, bgcolor: 'background.paper' }}
            InputLabelProps={{ style: { color: 'text.primary' } }}
          />

          <FormControl fullWidth sx={{ mb: 2, bgcolor: 'background.paper' }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color='error' sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ mt: 3 }}>
            <Typography variant='h6' gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={generatedReply || ''}
              inputProps={{ readOnly: true }}
              sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
            />
            
            <Button
              variant='outlined'
              sx={{ mt: 2 }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Email;