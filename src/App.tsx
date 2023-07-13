import { Button, createMuiTheme, Grid, ThemeProvider, Typography, Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMemo, useState } from 'react';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [password, setPassword] = useState('');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          h1: {
            fontSize: 16,
            fontWeight: 400,
          },
          body1: {
            fontFamily: 'monospace',
            fontSize: 18,
          },
        },
      }),
    [prefersDarkMode]
  );

  const generatePassword = (length: number) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }
    setPassword(generatedPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component='main' padding={2} display='flex'>
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
          <Grid item>
            <Typography variant='h1'>Password Generator</Typography>
          </Grid>

          <Grid item>
            <Typography variant='body1' style={{ userSelect: 'all' }}>
              {password}
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button onClick={() => generatePassword(8)} variant='contained' color='primary'>
                  8 characters
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => generatePassword(12)} variant='contained' color='primary'>
                  12 characters
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => generatePassword(16)} variant='contained' color='primary'>
                  16 characters
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button onClick={copyPassword} variant='contained' color='primary'>
              Copy Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
