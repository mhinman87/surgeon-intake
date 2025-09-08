import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const surgicalOptions = [
    {
      title: 'New Native Knee',
      description: 'Total knee arthroplasty intake form for primary knee replacement surgery',
      icon: '🦵',
      route: '/knee-intake',
      available: true,
    },
    {
      title: 'New Native Hip',
      description: 'Total hip arthroplasty intake form for primary hip replacement surgery',
      icon: '🦴',
      route: '/hip-intake',
      available: true,
    },
    {
      title: 'TKA Evaluation',
      description: 'Evaluation intake form for painful total knee arthroplasty',
      icon: '🔧',
      route: '/revision-knee-intake',
      available: true,
    },
    {
      title: 'THA Evaluation',
      description: 'Evaluation intake form for painful total hip arthroplasty',
      icon: '🔧',
      route: '/revision-hip-intake',
      available: true,
    },
    {
      title: 'Follow-up Native Knee',
      description: 'Follow-up intake form for native knee patients',
      icon: '🔄',
      route: '/followup-knee-intake',
      available: true,
    },
    {
      title: 'Follow-up Native Hip',
      description: 'Follow-up intake form for native hip patients',
      icon: '🔄',
      route: '/followup-hip-intake',
      available: true,
    },
    {
      title: 'Follow-up Painful TKA',
      description: 'Follow-up intake form for painful TKA patients',
      icon: '🔄',
      route: '/followup-painful-tka-intake',
      available: true,
    },
    {
      title: 'Follow-up Painful THA',
      description: 'Follow-up intake form for painful THA patients',
      icon: '🔄',
      route: '/followup-painful-tha-intake',
      available: true,
    },
    {
      title: 'Post-op TKA',
      description: 'Post-operative follow-up form for TKA patients',
      icon: '📋',
      route: '/postop-tka-intake',
      available: true,
    },
    {
      title: 'Post-op THA',
      description: 'Post-operative follow-up form for THA patients',
      icon: '📋',
      route: '/postop-tha-intake',
      available: true,
    },
    {
      title: 'Unplanned <1-year post-op THA',
      description: 'Unplanned early return form for THA patients',
      icon: '⚠️',
      route: '/unplanned-tha-intake',
      available: true,
    },
    {
      title: 'Unplanned <1-year post-op TKA',
      description: 'Unplanned early return form for TKA patients',
      icon: '⚠️',
      route: '/unplanned-tka-intake',
      available: true,
    },
    {
      title: '1-year THA / routine long term recheck THA',
      description: '1-year follow-up form for THA patients',
      icon: '📅',
      route: '/one-year-tha-intake',
      available: true,
    },
    {
      title: '1-year TKA / routine long term recheck TKA',
      description: '1-year follow-up form for TKA patients',
      icon: '📅',
      route: '/one-year-tka-intake',
      available: true,
    },
  ];

  const handleOptionClick = (option) => {
    if (option.available) {
      navigate(option.route);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Surgical Intake Portal
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Select the appropriate intake form for your surgical procedure
          </Typography>
        </Paper>

        {/* Surgical Options Grid */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: { xs: '0', sm: '2%' },
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          {surgicalOptions.map((option, index) => (
            <Box key={index} sx={{ 
              width: { xs: '100%', sm: '48%' }, 
              mb: 3,
              maxWidth: { xs: '400px', sm: 'none' }
            }}>
              <Card
                sx={{
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: option.available ? 'translateY(-4px)' : 'none',
                    boxShadow: option.available ? 6 : 2,
                  },
                  opacity: option.available ? 1 : 0.6,
                  cursor: option.available ? 'pointer' : 'not-allowed',
                }}
              >
                <CardActionArea
                  onClick={() => handleOptionClick(option)}
                  disabled={!option.available}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardContent sx={{ 
                    height: '100%',
                    textAlign: 'center', 
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <Box>
                      {/* Icon */}
                      <Typography
                        variant="h2"
                        sx={{
                          mb: 2,
                          fontSize: '3rem',
                          opacity: option.available ? 1 : 0.5,
                        }}
                      >
                        {option.icon}
                      </Typography>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: option.available ? 'primary.main' : 'text.secondary',
                          mb: 2,
                        }}
                      >
                        {option.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                        }}
                      >
                        {option.description}
                      </Typography>
                    </Box>

                    {/* Status Button */}
                    <Button
                      variant={option.available ? 'contained' : 'outlined'}
                      color={option.available ? 'primary' : 'inherit'}
                      size="large"
                      disabled={!option.available}
                      sx={{
                        width: '100%',
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        mt: 2,
                      }}
                    >
                      {option.available ? 'Start Intake' : 'Coming Soon'}
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default LandingPage;
