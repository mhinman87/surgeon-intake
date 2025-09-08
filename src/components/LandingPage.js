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
      title: 'Revision Knee',
      description: 'Revision knee arthroplasty intake form for knee revision surgery',
      icon: '🔧',
      route: '/revision-knee-intake',
      available: true,
    },
    {
      title: 'Revision Hip',
      description: 'Revision hip arthroplasty intake form for hip revision surgery',
      icon: '🔧',
      route: '/revision-hip-intake',
      available: false,
    },
    {
      title: 'Shoulder Arthroscopy',
      description: 'Shoulder arthroscopy intake form for shoulder procedures',
      icon: '🤲',
      route: '/shoulder-intake',
      available: false,
    },
    {
      title: 'Spine Surgery',
      description: 'Spine surgery intake form for spinal procedures',
      icon: '🦴',
      route: '/spine-intake',
      available: false,
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
        <Grid container spacing={3}>
          {surgicalOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
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
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
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
                        mb: 3,
                        lineHeight: 1.6,
                      }}
                    >
                      {option.description}
                    </Typography>

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
                      }}
                    >
                      {option.available ? 'Start Intake' : 'Coming Soon'}
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer Info */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mt: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(25, 118, 210, 0.05)',
            border: '1px solid rgba(25, 118, 210, 0.1)',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> Additional surgical intake forms are currently in development. 
            The New Native Knee, New Native Hip, and Revision Knee intake forms are fully functional and ready for use.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
