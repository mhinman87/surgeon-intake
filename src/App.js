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
import PreOpTKAIntakeForm from './components/PreOpTKAIntakeForm';
import PreOpTHAIntakeForm from './components/PreOpTHAIntakeForm';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06B6D4', // Teal primary to match landing page
      light: '#06B6D4', // Teal primary
      dark: '#0891B2', // Darker teal
    },
    secondary: {
      main: '#06B6D4', // Teal primary
    },
    background: {
      default: '#0A0A0B', // Surface color from schema
      paper: 'rgba(255, 255, 255, 0.02)', // Glass tint
    },
    text: {
      primary: '#FFFFFF', // Text primary
      secondary: '#9CA3AF', // Text secondary
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    h4: {
      fontWeight: 700, // Display weight
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700, // Display weight
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '12px 14px',
          minHeight: 'auto',
          color: '#FFFFFF', // Text primary
          backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
          '&.MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          },
        },
        icon: {
          color: '#9CA3AF', // Text secondary
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.1)', // Hairline
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#06B6D4', // Teal primary
            borderWidth: 2,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          color: '#FFFFFF', // Text primary
          backgroundColor: 'rgba(10, 10, 11, 0.95)', // Dark background with high opacity
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)', // Hairline
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
            '&.Mui-selected': {
              backgroundColor: 'rgba(6, 182, 212, 0.2)', // Teal primary tint
              '&:hover': {
                backgroundColor: 'rgba(6, 182, 212, 0.3)',
              },
            },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 10, 11, 0.95)', // Dark background with high opacity
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)', // Hairline
          borderRadius: '12px', // Corner radius
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)', // Shadow strong
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)', // Hairline
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#06B6D4', // Teal primary
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9CA3AF', // Text secondary
            '&.Mui-focused': {
              color: '#06B6D4', // Teal primary
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#9CA3AF', // Text secondary
          '&.Mui-focused': {
            color: '#06B6D4', // Teal primary
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
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                New Native Knee              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <PatientIntakeForm />
            </Container>
          } />
          <Route path="/hip-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                New Native Hip              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <HipIntakeForm />
            </Container>
          } />
          <Route path="/revision-knee-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                New Evaluate Painful TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <TKAIntakeForm />
            </Container>
          } />
          <Route path="/revision-hip-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                New Evaluate Painful THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <THAIntakeForm />
            </Container>
          } />
          <Route path="/followup-knee-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Follow-up Native Knee              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <FollowupKneeIntakeForm />
            </Container>
          } />
          <Route path="/followup-hip-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Follow-up Native Hip              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <FollowupHipIntakeForm />
            </Container>
          } />
          <Route path="/followup-painful-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Follow-up Painful TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <FollowupPainfulTKAIntakeForm />
            </Container>
          } />
          <Route path="/followup-painful-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Follow-up Painful THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <FollowupPainfulTHAIntakeForm />
            </Container>
          } />
          <Route path="/postop-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Post-op TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <PostopTKAIntakeForm />
            </Container>
          } />
          <Route path="/postop-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Post-op THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <PostopTHAIntakeForm />
            </Container>
          } />
          <Route path="/unplanned-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Unplanned &lt;1-year post-op THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <UnplannedTHAIntakeForm />
            </Container>
          } />
          <Route path="/unplanned-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Unplanned &lt;1-year post-op TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <UnplannedTKAIntakeForm />
            </Container>
          } />
          <Route path="/one-year-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                1-year THA / routine long term recheck THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <OneYearTHAIntakeForm />
            </Container>
          } />
          <Route path="/one-year-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                1-year TKA / routine long term recheck TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <OneYearTKAIntakeForm />
            </Container>
          } />
          <Route path="/preop-tka-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Pre-Op TKA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <PreOpTKAIntakeForm />
            </Container>
          } />
          <Route path="/preop-tha-intake" element={
            <Container maxWidth="md" sx={{ py: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ 
                  color: '#06B6D4', // Teal primary
                  fontWeight: 700, // Display weight
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Pre-Op THA              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                sx={{ 
                  color: '#9CA3AF', // Text secondary
                  mb: 3,
                  fontWeight: 400, // Body weight
                }}
              >
                Comprehensive Orthopedic Surgery Patient Assessment
              </Typography>
              <PreOpTHAIntakeForm />
            </Container>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;