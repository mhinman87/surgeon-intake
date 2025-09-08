import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LandingPage from './components/LandingPage';
import PatientIntakeForm from './components/PatientIntakeForm';
import HipIntakeForm from './components/HipIntakeForm';
import TKAIntakeForm from './components/TKAIntakeForm';
import THAIntakeForm from './components/THAIntakeForm';
import FollowupKneeIntakeForm from './components/FollowupKneeIntakeForm';
import FollowupHipIntakeForm from './components/FollowupHipIntakeForm';
import PostopTKAIntakeForm from './components/PostopTKAIntakeForm';
import PostopTHAIntakeForm from './components/PostopTHAIntakeForm';
import UnplannedTHAIntakeForm from './components/UnplannedTHAIntakeForm';
import UnplannedTKAIntakeForm from './components/UnplannedTKAIntakeForm';
import OneYearTHAIntakeForm from './components/OneYearTHAIntakeForm';
import OneYearTKAIntakeForm from './components/OneYearTKAIntakeForm';
import FollowupPainfulTKAIntakeForm from './components/FollowupPainfulTKAIntakeForm';
import FollowupPainfulTHAIntakeForm from './components/FollowupPainfulTHAIntakeForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '12px 14px',
          minHeight: 'auto',
          '&.MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          },
        },
        icon: {
          color: '#1976d2',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
            borderWidth: 2,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/knee-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  New Native Knee - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <PatientIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/hip-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  New Native Hip - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <HipIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/revision-knee-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  New Evaluate Painful TKA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <TKAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/revision-hip-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  New Evaluate Painful THA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <THAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/followup-knee-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Follow-up Native Knee - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <FollowupKneeIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/followup-hip-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Follow-up Native Hip - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <FollowupHipIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/followup-painful-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Follow-up Painful TKA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <FollowupPainfulTKAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/followup-painful-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Follow-up Painful THA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <FollowupPainfulTHAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/postop-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Post-op TKA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <PostopTKAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/postop-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Post-op THA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <PostopTHAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/unplanned-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Unplanned &lt;1-year post-op THA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <UnplannedTHAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/unplanned-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  Unplanned &lt;1-year post-op TKA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <UnplannedTKAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/one-year-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  1-year THA / routine long term recheck THA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <OneYearTHAIntakeForm />
              </Paper>
            </Container>
          } />
          <Route path="/one-year-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  1-year TKA / routine long term recheck TKA - Patient Intake Form
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                  Comprehensive Orthopedic Surgery Patient Assessment
                </Typography>
                <OneYearTKAIntakeForm />
              </Paper>
            </Container>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;