import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

export default function FollowupPainfulTKAComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const treatmentPlan = watch('treatmentPlan');
  const hasQuestions = watch('hasQuestions');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Follow-up Information
      </Typography>

      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* Knee Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.kneeSide}>
            <InputLabel id="knee-side-label" shrink={true}>Knee Side</InputLabel>
            <Select
              {...register('kneeSide')}
              value={watch('kneeSide') || ''}
              labelId="knee-side-label"
              label="Knee Side"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select knee side</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
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
            {errors.kneeSide && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.kneeSide.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Known History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Known History"
            {...register('knownHistory')}
            error={!!errors.knownHistory}
            helperText={errors.knownHistory?.message}
            multiline
            rows={3}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Treatment Plan */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.treatmentPlan}>
            <InputLabel id="treatment-plan-label" shrink={true}>Treatment Plan</InputLabel>
            <Select
              {...register('treatmentPlan')}
              value={watch('treatmentPlan') || ''}
              labelId="treatment-plan-label"
              label="Treatment Plan"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select treatment plan</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                }
              }}
            >
              <MenuItem value="observation">Observation</MenuItem>
              <MenuItem value="medication">Medication</MenuItem>
              <MenuItem value="physical therapy">Physical therapy</MenuItem>
              <MenuItem value="imaging">Imaging</MenuItem>
              <MenuItem value="labs">Labs</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.treatmentPlan && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.treatmentPlan.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Other Treatment - Conditional */}
        {treatmentPlan === 'other' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Please specify other treatment"
              {...register('otherTreatment')}
              error={!!errors.otherTreatment}
              helperText={errors.otherTreatment?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* History Changes */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Orthopedic/Medical History Changes"
            {...register('historyChanges')}
            error={!!errors.historyChanges}
            helperText={errors.historyChanges?.message}
            multiline
            rows={3}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Symptoms Status */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.symptomsStatus}>
            <InputLabel id="symptoms-status-label" shrink={true}>Symptoms Status</InputLabel>
            <Select
              {...register('symptomsStatus')}
              value={watch('symptomsStatus') || ''}
              labelId="symptoms-status-label"
              label="Symptoms Status"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select symptoms status</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                }
              }}
            >
              <MenuItem value="unchanged">Unchanged</MenuItem>
              <MenuItem value="worsening">Worsening</MenuItem>
              <MenuItem value="improving">Improving</MenuItem>
            </Select>
            {errors.symptomsStatus && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.symptomsStatus.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Questions/Concerns */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hasQuestions}>
            <InputLabel id="has-questions-label" shrink={true}>Questions/Concerns</InputLabel>
            <Select
              {...register('hasQuestions')}
              value={watch('hasQuestions') || ''}
              labelId="has-questions-label"
              label="Questions/Concerns Status"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select questions/concerns status</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#06B6D4',
                  }
                }
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.hasQuestions && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.hasQuestions.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Questions Details - Conditional */}
        {hasQuestions === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Please provide details about questions/concerns"
              {...register('questionsDetails')}
              error={!!errors.questionsDetails}
              helperText={errors.questionsDetails?.message}
              multiline
              rows={3}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
