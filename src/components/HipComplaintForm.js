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
  Slider,
} from '@mui/material';

const HipComplaintForm = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const hipSide = watch('hipSide');
  const injuryHistory = watch('injuryHistory');
  const lumbarSpineHistory = watch('lumbarSpineHistory');

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
        Hip Complaint Assessment
      </Typography>

      <Grid container spacing={3}>
        {/* Hip Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hipSide}>
            <InputLabel id="hip-side-label" shrink>Hip Side</InputLabel>
            <Select
              {...register('hipSide')}
              labelId="hip-side-label"
              label="Hip Side"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select hip side</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="right">Right</MenuItem>
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="bilateral">Bilateral</MenuItem>
            </Select>
          </FormControl>
          {errors.hipSide && (
            <Typography variant="caption" color="error">
              {errors.hipSide.message}
            </Typography>
          )}
        </Grid>

        {/* Worse Side - only show if bilateral */}
        {hipSide === 'bilateral' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <FormControl fullWidth error={!!errors.worseSide}>
              <InputLabel id="worse-side-label" shrink>Which Side is Worse?</InputLabel>
              <Select
                {...register('worseSide')}
                labelId="worse-side-label"
                label="Which Side is Worse?"
                displayEmpty
                notched
                renderValue={(selected) => {
                  if (!selected) {
                    return <em style={{ color: '#666' }}>Select which side is worse</em>;
                  }
                  return selected.charAt(0).toUpperCase() + selected.slice(1);
                }}
                sx={{ 
                  '& .MuiSelect-select': {
                    padding: '16px 14px 8px 14px',
                    minHeight: 'auto',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                    borderWidth: 2,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                    borderWidth: 2,
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    '&.Mui-focused': {
                      color: '#1976d2',
                    }
                  }
                }}
              >
                <MenuItem value="right is worse">Right is worse</MenuItem>
                <MenuItem value="left is worse">Left is worse</MenuItem>
                <MenuItem value="right and left are equally painful">Right and left are equally painful</MenuItem>
              </Select>
            </FormControl>
            {errors.worseSide && (
              <Typography variant="caption" color="error">
                {errors.worseSide.message}
              </Typography>
            )}
          </Grid>
        )}

        {/* Pain Location */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Pain Location"
            {...register('painLocation')}
            error={!!errors.painLocation}
            helperText={errors.painLocation?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Injury History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.injuryHistory}>
            <InputLabel id="injury-history-label" shrink>Injury History</InputLabel>
            <Select
              {...register('injuryHistory')}
              labelId="injury-history-label"
              label="Injury History"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select injury history</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="negative">Negative</MenuItem>
              <MenuItem value="positive">Positive</MenuItem>
            </Select>
          </FormControl>
          {errors.injuryHistory && (
            <Typography variant="caption" color="error">
              {errors.injuryHistory.message}
            </Typography>
          )}
        </Grid>

        {/* Injury Description - only show if positive */}
        {injuryHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Injury Description"
              {...register('injuryDescription')}
              error={!!errors.injuryDescription}
              helperText={errors.injuryDescription?.message}
              sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
            />
          </Grid>
        )}

        {/* Previous Surgeries */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Previous Hip Surgeries"
            {...register('previousSurgeries')}
            error={!!errors.previousSurgeries}
            helperText={errors.previousSurgeries?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Symptom Duration */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.symptomDuration}>
            <InputLabel id="symptom-duration-label" shrink>Symptom Duration</InputLabel>
            <Select
              {...register('symptomDuration')}
              labelId="symptom-duration-label"
              label="Symptom Duration"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select symptom duration</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="days">Days</MenuItem>
              <MenuItem value="weeks">Weeks</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="years">Years</MenuItem>
            </Select>
          </FormControl>
          {errors.symptomDuration && (
            <Typography variant="caption" color="error">
              {errors.symptomDuration.message}
            </Typography>
          )}
        </Grid>

        {/* Symptom Progression */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.symptomProgression}>
            <InputLabel id="symptom-progression-label" shrink>Symptom Progression</InputLabel>
            <Select
              {...register('symptomProgression')}
              labelId="symptom-progression-label"
              label="Symptom Progression"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select symptom progression</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="worsening">Worsening</MenuItem>
              <MenuItem value="improving">Improving</MenuItem>
              <MenuItem value="unchanged">Unchanged</MenuItem>
            </Select>
          </FormControl>
          {errors.symptomProgression && (
            <Typography variant="caption" color="error">
              {errors.symptomProgression.message}
            </Typography>
          )}
        </Grid>

        {/* Pain Level Sliders */}
        <Grid item xs={12} sm={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Worst Pain Level (0-10)</Typography>
          <Slider
            {...register('worstPainLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ color: '#1976d2' }}
          />
          {errors.worstPainLevel && (
            <Typography variant="caption" color="error">
              {errors.worstPainLevel.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Best Pain Level (0-10)</Typography>
          <Slider
            {...register('bestPainLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ color: '#1976d2' }}
          />
          {errors.bestPainLevel && (
            <Typography variant="caption" color="error">
              {errors.bestPainLevel.message}
            </Typography>
          )}
        </Grid>

        {/* Pain Description */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Pain Description"
            {...register('painDescription')}
            error={!!errors.painDescription}
            helperText={errors.painDescription?.message}
            multiline
            rows={4}
            sx={{ textAlign: 'left' }}
          />
        </Grid>

        {/* Aggravating Factors */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Aggravating Factors"
            {...register('aggravatingFactors')}
            error={!!errors.aggravatingFactors}
            helperText={errors.aggravatingFactors?.message}
            multiline
            rows={3}
            sx={{ textAlign: 'left' }}
          />
        </Grid>

        {/* Alleviating Factors */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Alleviating Factors"
            {...register('alleviatingFactors')}
            error={!!errors.alleviatingFactors}
            helperText={errors.alleviatingFactors?.message}
            multiline
            rows={3}
            sx={{ textAlign: 'left' }}
          />
        </Grid>

        {/* Associated Symptoms */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Associated Symptoms"
            {...register('associatedSymptoms')}
            error={!!errors.associatedSymptoms}
            helperText={errors.associatedSymptoms?.message}
            multiline
            rows={3}
            sx={{ textAlign: 'left' }}
          />
        </Grid>

        {/* Attempted Treatments */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Attempted Treatments"
            {...register('attemptedTreatments')}
            error={!!errors.attemptedTreatments}
            helperText={errors.attemptedTreatments?.message}
            multiline
            rows={3}
            sx={{ textAlign: 'left' }}
          />
        </Grid>

        {/* Treatment Success */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.treatmentSuccess}>
            <InputLabel id="treatment-success-label" shrink>Treatment Success</InputLabel>
            <Select
              {...register('treatmentSuccess')}
              labelId="treatment-success-label"
              label="Treatment Success"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select treatment success level</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
              <MenuItem value="mild">Mild</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="significant">Significant</MenuItem>
            </Select>
          </FormControl>
          {errors.treatmentSuccess && (
            <Typography variant="caption" color="error">
              {errors.treatmentSuccess.message}
            </Typography>
          )}
        </Grid>

        {/* Lumbar Spine History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.lumbarSpineHistory}>
            <InputLabel id="lumbar-spine-history-label" shrink>Lumbar Spine History</InputLabel>
            <Select
              {...register('lumbarSpineHistory')}
              labelId="lumbar-spine-history-label"
              label="Lumbar Spine History"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select lumbar spine history</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="negative">Negative</MenuItem>
              <MenuItem value="positive">Positive</MenuItem>
            </Select>
          </FormControl>
          {errors.lumbarSpineHistory && (
            <Typography variant="caption" color="error">
              {errors.lumbarSpineHistory.message}
            </Typography>
          )}
        </Grid>

        {/* Lumbar Spine Description - only show if positive */}
        {lumbarSpineHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Lumbar Spine History Description"
              {...register('lumbarSpineDescription')}
              error={!!errors.lumbarSpineDescription}
              helperText={errors.lumbarSpineDescription?.message}
              multiline
              rows={3}
              sx={{ textAlign: 'left' }}
            />
          </Grid>
        )}

        {/* Imaging Studies */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.imagingStudies}>
            <InputLabel id="imaging-studies-label" shrink>Imaging Studies</InputLabel>
            <Select
              {...register('imagingStudies')}
              labelId="imaging-studies-label"
              label="Imaging Studies"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select imaging studies</em>;
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{ 
                '& .MuiSelect-select': {
                  padding: '16px 14px 8px 14px',
                  minHeight: 'auto',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: 2,
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  }
                }
              }}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="x-rays">X-rays</MenuItem>
              <MenuItem value="mri">MRI</MenuItem>
              <MenuItem value="ct">CT</MenuItem>
            </Select>
          </FormControl>
          {errors.imagingStudies && (
            <Typography variant="caption" color="error">
              {errors.imagingStudies.message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HipComplaintForm;
