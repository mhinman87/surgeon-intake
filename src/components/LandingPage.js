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
      options: [
        {
          title: 'Native Knee',
          description: 'Total knee arthroplasty intake form for primary knee replacement surgery',
          route: '/knee-intake',
          available: true,
        },
        {
          title: 'Native Hip',
          description: 'Total hip arthroplasty intake form for primary hip replacement surgery',
          route: '/hip-intake',
          available: true,
        },
        {
          title: 'TKA',
          description: 'Evaluation intake form for painful total knee arthroplasty',
          route: '/revision-knee-intake',
          available: true,
        },
        {
          title: 'THA',
          description: 'Evaluation intake form for painful total hip arthroplasty',
          route: '/revision-hip-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Follow-up Visits',
      description: 'Routine follow-up forms for existing patients',
      options: [
        {
          title: 'Native Knee',
          description: 'Follow-up intake form for native knee patients',
          route: '/followup-knee-intake',
          available: true,
        },
        {
          title: 'Native Hip',
          description: 'Follow-up intake form for native hip patients',
          route: '/followup-hip-intake',
          available: true,
        },
        {
          title: 'Painful TKA',
          description: 'Follow-up intake form for painful TKA patients',
          route: '/followup-painful-tka-intake',
          available: true,
        },
        {
          title: 'Painful THA',
          description: 'Follow-up intake form for painful THA patients',
          route: '/followup-painful-tha-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Pre-operative',
      description: 'Pre-surgical evaluation forms',
      options: [
        {
          title: 'Pre-Op TKA',
          description: 'Pre-operative evaluation form for total knee arthroplasty',
          route: '/preop-tka-intake',
          available: true,
        },
        {
          title: 'Pre-Op THA',
          description: 'Pre-operative evaluation form for total hip arthroplasty',
          route: '/preop-tha-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Post-operative',
      description: 'Post-surgical follow-up forms',
      options: [
        {
          title: 'Post-op TKA',
          description: 'Post-operative follow-up form for TKA patients',
          route: '/postop-tka-intake',
          available: true,
        },
        {
          title: 'Post-op THA',
          description: 'Post-operative follow-up form for THA patients',
          route: '/postop-tha-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Unplanned Visits',
      description: 'Early return forms for unexpected issues',
      options: [
        {
          title: '<1-year post-op THA',
          description: 'Unplanned early return form for THA patients',
          route: '/unplanned-tha-intake',
          available: true,
        },
        {
          title: '<1-year post-op TKA',
          description: 'Unplanned early return form for TKA patients',
          route: '/unplanned-tka-intake',
          available: true,
        },
      ],
    },
    {
      title: 'Annual Check-ups',
      description: 'Long-term follow-up and routine check-up forms',
      options: [
        {
          title: '1-year THA / routine long term recheck THA',
          description: '1-year follow-up form for THA patients',
          route: '/one-year-tha-intake',
          available: true,
        },
        {
          title: '1-year TKA / routine long term recheck TKA',
          description: '1-year follow-up form for TKA patients',
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
        background: '#0A0A0B', // Surface color from schema
        py: 3, // Compact density
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgba(99, 102, 241, 0.15) 49%, rgba(99, 102, 241, 0.15) 51%, transparent 52%),
            linear-gradient(-30deg, transparent 48%, rgba(139, 92, 246, 0.12) 49%, rgba(139, 92, 246, 0.12) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(99, 102, 241, 0.1) 49%, rgba(99, 102, 241, 0.1) 51%, transparent 52%)
          `,
          backgroundSize: '60px 52px, 60px 52px, 60px 52px',
          backgroundPosition: '0 0, 30px 26px, 0 0',
          opacity: 0.8,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgba(139, 92, 246, 0.1) 49%, rgba(139, 92, 246, 0.1) 51%, transparent 52%),
            linear-gradient(-30deg, transparent 48%, rgba(99, 102, 241, 0.08) 49%, rgba(99, 102, 241, 0.08) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(139, 92, 246, 0.06) 49%, rgba(139, 92, 246, 0.06) 51%, transparent 52%)
          `,
          backgroundSize: '60px 52px, 60px 52px, 60px 52px',
          backgroundPosition: '30px 26px, 0 0, 30px 26px',
          opacity: 0.6,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 6, // Increased spacing for circular design
            p: 4, // More padding for circular shape
            background: 'rgba(0, 0, 0, 0.8)', // Dark background to match icon
            borderRadius: '50%', // Perfect circle
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(6, 182, 212, 0.8)', // Thicker teal border
            boxShadow: 'none', // Remove glow effect
            position: 'relative',
            width: '200px', // Smaller circle to better frame icon
            height: '200px', // Smaller circle to better frame icon
            margin: '0 auto 48px auto', // Center horizontally
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)', // Dark gradient
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            component="img"
            src={`/patient-intake-icon.png?v=${Date.now()}`}
            alt="Patient Intake Portal"
            onError={(e) => {
              console.log('Image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Image loaded successfully');
            }}
            sx={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              opacity: 0.9,
            }}
          />
        </Box>

        {/* Surgical Categories */}
        {surgicalCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 6 }}>
            {/* Category Header */}
            <Box
              sx={{
                p: 2, // Compact padding
                mb: 2, // 8-point scale spacing
                maxWidth: '400px', // Shorter width
                margin: '0 auto', // Center the shorter buttons
                background: 'rgba(0, 0, 0, 0.8)', // Dark background to match icon
                color: 'white',
                borderRadius: '50px', // Very rounded corners
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(6, 182, 212, 0.8)', // Thicker teal border
                boxShadow: 'none', // Remove glow effect
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)', // Dark gradient
                  pointerEvents: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-1px)',
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '2px solid rgba(6, 182, 212, 1)', // Solid teal border on hover
                  boxShadow: 'none', // No glow effect
                },
              }}
              onClick={() => handleCategoryToggle(categoryIndex)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700, // Display weight
                      mb: 0.5, // Compact spacing
                      color: '#FFFFFF', // Text primary
                      letterSpacing: '-0.01em',
                      fontSize: '1.125rem',
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#9CA3AF', // Text secondary
                      fontWeight: 400, // Body weight
                      fontSize: '0.875rem',
                    }}
                  >
                    {category.description}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Category Options Grid */}
            <Collapse in={expandedCategories[categoryIndex]} timeout="auto" unmountOnExit>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: { xs: '0', sm: '2%' },
                justifyContent: 'center',
                mt: 4, // Increased top margin for more spacing
              }}>
                {category.options.map((option, optionIndex) => (
                  <Box key={optionIndex} sx={{ 
                    width: '160px', // Fixed width for circle
                    height: '160px', // Fixed height for circle
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                          <Card
                            sx={{
                              width: '160px', // Fixed width for circle
                              height: '160px', // Fixed height for circle
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'all 0.2s ease-out',
                              background: 'rgba(0, 0, 0, 0.8)', // Dark background to match headers
                              color: 'white',
                              borderRadius: '12px', // Rounded corners
                              border: '2px solid rgba(6, 182, 212, 0.8)', // Thicker teal border
                              backdropFilter: 'blur(20px)',
                              boxShadow: 'none', // Remove glow effect
                              position: 'relative',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)', // Dark gradient
                                pointerEvents: 'none',
                              },
                              '&:hover': {
                                transform: option.available ? 'translateY(-2px)' : 'none',
                                background: option.available ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                                border: option.available ? '2px solid rgba(6, 182, 212, 1)' : '2px solid rgba(6, 182, 212, 0.8)', // Solid teal border
                                boxShadow: 'none', // No glow effect
                              },
                              opacity: option.available ? 1 : 0.5,
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
                                p: 1.5, // Compact padding
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                              }}>
                                {/* Icon for Native Knee */}
                                {option.title === 'Native Knee' && (
                                  <Box sx={{ position: 'relative' }}>
                                    <Box
                                      component="img"
                                      src={`/knee-icon.png?v=${Date.now()}`}
                                      alt="Knee Icon"
                                      onError={(e) => {
                                        console.log('Knee icon failed to load:', e.target.src);
                                      }}
                                      onLoad={() => {
                                        console.log('Knee icon loaded successfully');
                                      }}
                                      sx={{
                                        width: '140px',
                                        height: '120px',
                                        objectFit: 'contain',
                                        opacity: 0.9,
                                        mb: 1,
                                      }}
                                    />
                                    {/* Title at bottom */}
                                    <Typography
                                      variant="h6"
                                      component="h3"
                                      sx={{
                                        position: 'absolute',
                                        bottom: '2px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        fontSize: '0.875rem',
                                        letterSpacing: '-0.01em',
                                        textShadow: '0 0 4px rgba(0, 0, 0, 0.8)',
                                        zIndex: 2,
                                        width: '100%',
                                        textAlign: 'center',
                                      }}
                                    >
                                      {option.title}
                                    </Typography>
                                  </Box>
                                )}

                                {/* Icon for Native Hip */}
                                {option.title === 'Native Hip' && (
                                  <Box sx={{ position: 'relative' }}>
                                    <Box
                                      component="img"
                                      src={`/hip-icon.png?v=${Date.now()}`}
                                      alt="Hip Icon"
                                      onError={(e) => {
                                        console.log('Hip icon failed to load:', e.target.src);
                                      }}
                                      onLoad={() => {
                                        console.log('Hip icon loaded successfully');
                                      }}
                                      sx={{
                                        width: '140px',
                                        height: '120px',
                                        objectFit: 'contain',
                                        opacity: 0.9,
                                        mb: 1,
                                      }}
                                    />
                                    {/* Title at bottom */}
                                    <Typography
                                      variant="h6"
                                      component="h3"
                                      sx={{
                                        position: 'absolute',
                                        bottom: '2px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        fontSize: '0.875rem',
                                        letterSpacing: '-0.01em',
                                        textShadow: '0 0 4px rgba(0, 0, 0, 0.8)',
                                        zIndex: 2,
                                        width: '100%',
                                        textAlign: 'center',
                                      }}
                                    >
                                      {option.title}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {/* Icons for other cards */}
                                {option.title !== 'Native Knee' && option.title !== 'Native Hip' && (
                                  <Box sx={{ position: 'relative' }}>
                                    {/* Hip-related cards */}
                                    {(option.title.includes('Hip') || option.title.includes('THA')) && (
                                      <Box
                                        component="img"
                                        src={`/hip-icon.png?v=${Date.now()}`}
                                        alt="Hip Icon"
                                        onError={(e) => {
                                          console.log('Hip icon failed to load:', e.target.src);
                                        }}
                                        onLoad={() => {
                                          console.log('Hip icon loaded successfully');
                                        }}
                                        sx={{
                                          width: '140px',
                                          height: '120px',
                                          objectFit: 'contain',
                                          opacity: 0.9,
                                          mb: 1,
                                        }}
                                      />
                                    )}
                                    
                                    {/* Knee-related cards */}
                                    {(option.title.includes('Knee') || option.title.includes('TKA')) && (
                                      <Box
                                        component="img"
                                        src={`/knee-icon.png?v=${Date.now()}`}
                                        alt="Knee Icon"
                                        onError={(e) => {
                                          console.log('Knee icon failed to load:', e.target.src);
                                        }}
                                        onLoad={() => {
                                          console.log('Knee icon loaded successfully');
                                        }}
                                        sx={{
                                          width: '140px',
                                          height: '120px',
                                          objectFit: 'contain',
                                          opacity: 0.9,
                                          mb: 1,
                                        }}
                                      />
                                    )}
                                    
                                    {/* Title at bottom */}
                                    <Typography
                                      variant="h6"
                                      component="h3"
                                      sx={{
                                        position: 'absolute',
                                        bottom: '2px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        fontSize: '0.875rem',
                                        letterSpacing: '-0.01em',
                                        textShadow: '0 0 4px rgba(0, 0, 0, 0.8)',
                                        zIndex: 2,
                                        width: '100%',
                                        textAlign: 'center',
                                      }}
                                    >
                                      {option.title}
                                    </Typography>
                                  </Box>
                                )}

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
