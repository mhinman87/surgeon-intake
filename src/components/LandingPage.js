import React, { useState } from 'react';
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
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryToggle = (categoryIndex) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex]
    }));
  };

  const surgicalCategories = [
    {
      title: 'New Patient Evaluations',
      description: 'Initial evaluation forms for new patients',
      icon: '🆕',
      color: '#1976d2',
      options: [
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
      ],
    },
    {
      title: 'Follow-up Visits',
      description: 'Routine follow-up forms for existing patients',
      icon: '🔄',
      color: '#388e3c',
      options: [
        {
          title: 'Follow-up Native Knee',
          description: 'Follow-up intake form for native knee patients',
          icon: '🦵',
          route: '/followup-knee-intake',
          available: true,
        },
        {
          title: 'Follow-up Native Hip',
          description: 'Follow-up intake form for native hip patients',
          icon: '🦴',
          route: '/followup-hip-intake',
          available: true,
        },
        {
          title: 'Follow-up Painful TKA',
          description: 'Follow-up intake form for painful TKA patients',
          icon: '🔧',
          route: '/followup-painful-tka-intake',
          available: true,
        },
        {
          title: 'Follow-up Painful THA',
          description: 'Follow-up intake form for painful THA patients',
          icon: '🔧',
          route: '/followup-painful-tha-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Post-operative',
      description: 'Post-surgical follow-up forms',
      icon: '📋',
      color: '#f57c00',
      options: [
        {
          title: 'Post-op TKA',
          description: 'Post-operative follow-up form for TKA patients',
          icon: '🦵',
          route: '/postop-tka-intake',
          available: true,
        },
        {
          title: 'Post-op THA',
          description: 'Post-operative follow-up form for THA patients',
          icon: '🦴',
          route: '/postop-tha-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Unplanned Visits',
      description: 'Early return forms for unexpected issues',
      icon: '⚠️',
      color: '#d32f2f',
      options: [
        {
          title: 'Unplanned <1-year post-op THA',
          description: 'Unplanned early return form for THA patients',
          icon: '🦴',
          route: '/unplanned-tha-intake',
          available: true,
        },
        {
          title: 'Unplanned <1-year post-op TKA',
          description: 'Unplanned early return form for TKA patients',
          icon: '🦵',
          route: '/unplanned-tka-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Annual Check-ups',
      description: 'Long-term follow-up and routine check-up forms',
      icon: '📅',
      color: '#7b1fa2',
      options: [
        {
          title: '1-year THA / routine long term recheck THA',
          description: '1-year follow-up form for THA patients',
          icon: '🦴',
          route: '/one-year-tha-intake',
          available: true,
        },
        {
          title: '1-year TKA / routine long term recheck TKA',
          description: '1-year follow-up form for TKA patients',
          icon: '🦵',
          route: '/one-year-tka-intake',
          available: true,
        },
      ],
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

        {/* Surgical Categories */}
        {surgicalCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 6 }}>
            {/* Category Header */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                color: 'white',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleCategoryToggle(categoryIndex)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h2" sx={{ fontSize: '2.5rem' }}>
                  {category.icon}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {category.description}
                  </Typography>
                </Box>
                <IconButton
                  sx={{ 
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {expandedCategories[categoryIndex] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </Paper>

            {/* Category Options Grid */}
            <Collapse in={expandedCategories[categoryIndex]} timeout="auto" unmountOnExit>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: { xs: '0', sm: '2%' },
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}>
                {category.options.map((option, optionIndex) => (
                  <Box key={optionIndex} sx={{ 
                    width: { xs: '100%', sm: '48%' }, 
                    mb: 3,
                    maxWidth: { xs: '400px', sm: 'none' }
                  }}>
                    <Card
                      sx={{
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        border: `2px solid ${category.color}20`,
                        '&:hover': {
                          transform: option.available ? 'translateY(-4px)' : 'none',
                          boxShadow: option.available ? 6 : 2,
                          border: `2px solid ${category.color}`,
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
                                fontSize: '2.5rem',
                                opacity: option.available ? 1 : 0.5,
                              }}
                            >
                              {option.icon}
                            </Typography>

                            {/* Title */}
                            <Typography
                              variant="h6"
                              component="h3"
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
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                lineHeight: 1.5,
                              }}
                            >
                              {option.description}
                            </Typography>
                          </Box>

                          {/* Status Button */}
                          <Button
                            variant={option.available ? 'contained' : 'outlined'}
                            color={option.available ? 'primary' : 'inherit'}
                            size="medium"
                            disabled={!option.available}
                            sx={{
                              width: '100%',
                              py: 1,
                              fontSize: '1rem',
                              fontWeight: 600,
                              mt: 2,
                              backgroundColor: option.available ? category.color : 'transparent',
                              '&:hover': {
                                backgroundColor: option.available ? category.color : 'transparent',
                                opacity: 0.9,
                              },
                            }}
                          >
                            {option.available ? 'Start Form' : 'Coming Soon'}
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}

      </Container>
    </Box>
  );
};

export default LandingPage;
