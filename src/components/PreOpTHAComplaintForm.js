import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';

const PreOpTHAComplaintForm = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const hasQuestions = watch('hasQuestions');

  return (
    <Box sx={{
      background: 'rgba(255, 255, 255, 0.02)', // Glass tint
      borderRadius: '12px', // Corner radius
      border: '1px solid rgba(255, 255, 255, 0.06)', // Hairline
      backdropFilter: 'blur(20px)',
      p: 3, // Compact padding
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.2)', // Shadow soft
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          mb: 3,
          color: '#06B6D4', // Accent primary
          fontWeight: 700, // Display weight
          fontSize: '1.125rem',
          letterSpacing: '-0.01em',
        }}
      >
        Pre-Op THA Assessment
      </Typography>

      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* Hip Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hipSide}>
            <InputLabel 
              id="hip-side-label" 
              shrink
              sx={{
                color: '#9CA3AF', // Text secondary
                fontWeight: 500, // Body weight
                fontSize: '0.875rem',
                '&.Mui-focused': {
                  color: '#06B6D4', // Accent primary
                },
              }}
            >
              Hip Side
            </InputLabel>
            <Select
              {...register('hipSide')}
              value={watch('hipSide') || ''}
              labelId="hip-side-label"
              label="Hip Side"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#6B7280' }}>Select hip side</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                  color: '#FFFFFF', // Text primary
                  backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)', // Hairline
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  borderWidth: 1,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4', // Accent primary
                  borderWidth: 2,
                },
                '& .MuiSvgIcon-root': {
                  color: '#9CA3AF', // Text secondary
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                }
              }}
            >
              <MenuItem value="right">Right</MenuItem>
              <MenuItem value="left">Left</MenuItem>
            </Select>
          </FormControl>
          {errors.hipSide && (
            <Typography 
              variant="caption" 
              sx={{
                color: '#EF4444', // Error color
                fontSize: '0.75rem',
                fontWeight: 500,
                mt: 0.5,
                display: 'block',
              }}
            >
              {errors.hipSide.message}
            </Typography>
          )}
        </Grid>

        {/* Diagnosis */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Diagnosis"
            {...register('diagnosis')}
            error={!!errors.diagnosis}
            helperText={errors.diagnosis?.message}
            sx={{ 
              textAlign: 'left', 
              '& .MuiInputBase-input': { padding: '20px 14px' },
              '& .MuiInputLabel-root': {
                color: '#9CA3AF',
                '&.Mui-focused': {
                  color: '#06B6D4',
                }
              },
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#06B6D4',
                },
              }
            }}
          />
        </Grid>

        {/* Orthopedic/Medical History Changes */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Orthopedic/Medical History Changes Since Last Seen"
            {...register('historyChanges')}
            error={!!errors.historyChanges}
            helperText={errors.historyChanges?.message}
            multiline
            rows={4}
            sx={{ 
              textAlign: 'left',
              '& .MuiInputLabel-root': {
                color: '#9CA3AF',
                '&.Mui-focused': {
                  color: '#06B6D4',
                }
              },
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#06B6D4',
                },
              }
            }}
          />
        </Grid>


        {/* Has Questions */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hasQuestions}>
            <InputLabel 
              id="has-questions-label" 
              shrink
              sx={{
                color: '#9CA3AF', // Text secondary
                fontWeight: 500, // Body weight
                fontSize: '0.875rem',
                '&.Mui-focused': {
                  color: '#06B6D4', // Accent primary
                },
              }}
            >
              Questions/Concerns
            </InputLabel>
            <Select
              {...register('hasQuestions')}
              value={watch('hasQuestions') || ''}
              labelId="has-questions-label"
              label="Questions/Concerns"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#6B7280' }}>Select if patient has questions</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                  color: '#FFFFFF', // Text primary
                  backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)', // Hairline
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  borderWidth: 1,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4', // Accent primary
                  borderWidth: 2,
                },
                '& .MuiSvgIcon-root': {
                  color: '#9CA3AF', // Text secondary
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                }
              }}
            >
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
            </Select>
          </FormControl>
          {errors.hasQuestions && (
            <Typography 
              variant="caption" 
              sx={{
                color: '#EF4444', // Error color
                fontSize: '0.75rem',
                fontWeight: 500,
                mt: 0.5,
                display: 'block',
              }}
            >
              {errors.hasQuestions.message}
            </Typography>
          )}
        </Grid>

        {/* Questions Details - only show if yes */}
        {hasQuestions === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Please provide details about questions/concerns"
              {...register('questionsDetails')}
              error={!!errors.questionsDetails}
              helperText={errors.questionsDetails?.message}
              multiline
              rows={4}
              sx={{ 
                textAlign: 'left',
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                },
                '& .MuiOutlinedInput-root': {
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#06B6D4',
                  },
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PreOpTHAComplaintForm;
