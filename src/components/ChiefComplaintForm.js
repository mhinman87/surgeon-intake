import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Slider,
} from '@mui/material';

export default function ChiefComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const kneeSide = watch('kneeSide');
  const recentInjury = watch('recentInjury');

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Chief Complaint & Pain Assessment
      </Typography>
      
      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* Chief Complaint field removed */}
        
        {/* Knee Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.kneeSide}>
            <InputLabel id="knee-side-label" shrink={true}>Knee Side</InputLabel>
            <Select
              {...register('kneeSide')}
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
          {errors.kneeSide && (
            <Typography variant="caption" color="error">
              {errors.kneeSide.message}
            </Typography>
          )}
        </Grid>

        {/* Patient Name field removed */}

        {/* Worse Side - only show if bilateral */}
        {kneeSide === 'bilateral' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <FormControl fullWidth error={!!errors.worseSide}>
              <InputLabel id="worse-side-label">Which side is worse?</InputLabel>
              <Select
                {...register('worseSide')}
                labelId="worse-side-label"
                label="Which side is worse?"
                displayEmpty
                sx={{ 
                  '& .MuiSelect-select': {
                    padding: '12px 14px',
                  }
                }}
              >
                <MenuItem value="">
                  <em>Select worse side</em>
                </MenuItem>
                <MenuItem value="right">Right</MenuItem>
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="equally">Right and left are equally painful</MenuItem>
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
            placeholder="e.g., medial aspect of the knee"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Recent Injury */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.recentInjury}>
            <InputLabel id="recent-injury-label" shrink={true}>Recent Injury History</InputLabel>
            <Select
              {...register('recentInjury')}
              labelId="recent-injury-label"
              label="Recent Injury History"
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
          {errors.recentInjury && (
            <Typography variant="caption" color="error">
              {errors.recentInjury.message}
            </Typography>
          )}
        </Grid>

        {/* Injury Description - Conditional */}
        {recentInjury === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Injury Description"
              {...register('injuryDescription')}
              error={!!errors.injuryDescription}
              helperText={errors.injuryDescription?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Previous Surgeries */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Previous Knee Surgeries"
            {...register('previousSurgeries')}
            error={!!errors.previousSurgeries}
            helperText={errors.previousSurgeries?.message}
            placeholder="e.g., None, ACL reconstruction 2019"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Pain Duration */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.painDuration}>
            <InputLabel id="pain-duration-label" shrink={true}>Pain Duration</InputLabel>
            <Select
              {...register('painDuration')}
              labelId="pain-duration-label"
              label="Pain Duration"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select duration</em>;
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
          {errors.painDuration && (
            <Typography variant="caption" color="error">
              {errors.painDuration.message}
            </Typography>
          )}
        </Grid>

        {/* Pain Progression */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.painProgression}>
            <InputLabel id="pain-progression-label" shrink={true}>Pain Progression</InputLabel>
            <Select
              {...register('painProgression')}
              labelId="pain-progression-label"
              label="Pain Progression"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select progression</em>;
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
          {errors.painProgression && (
            <Typography variant="caption" color="error">
              {errors.painProgression.message}
            </Typography>
          )}
        </Grid>

        {/* Pain Level Sliders */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Worst Pain Level (0-10)</Typography>
          <Slider
            {...register('worstPainLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            error={!!errors.worstPainLevel}
          />
          {errors.worstPainLevel && (
            <Typography variant="caption" color="error">
              {errors.worstPainLevel.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Best Pain Level (0-10)</Typography>
          <Slider
            {...register('bestPainLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            error={!!errors.bestPainLevel}
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
            multiline
            rows={6}
            label="Pain Description"
            {...register('painDescription')}
            error={!!errors.painDescription}
            helperText={errors.painDescription?.message}
            placeholder="Describe the pain in detail"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Aggravating Factors */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Aggravating Factors"
            {...register('aggravatingFactors')}
            error={!!errors.aggravatingFactors}
            helperText={errors.aggravatingFactors?.message}
            placeholder="What makes the pain worse?"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Alleviating Factors */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Alleviating Factors"
            {...register('alleviatingFactors')}
            error={!!errors.alleviatingFactors}
            helperText={errors.alleviatingFactors?.message}
            placeholder="What helps relieve the pain?"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Associated Symptoms */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Associated Symptoms"
            {...register('associatedSymptoms')}
            error={!!errors.associatedSymptoms}
            helperText={errors.associatedSymptoms?.message}
            placeholder="e.g., swelling, stiffness, clicking"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Attempted Treatments */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Attempted Treatments"
            {...register('attemptedTreatments')}
            error={!!errors.attemptedTreatments}
            helperText={errors.attemptedTreatments?.message}
            placeholder="What treatments have been tried?"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Treatment Success */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.treatmentSuccess}>
            <InputLabel id="treatment-success-label" shrink={true}>Treatment Success</InputLabel>
            <Select
              {...register('treatmentSuccess')}
              labelId="treatment-success-label"
              label="Treatment Success"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select success level</em>;
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
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
          {errors.treatmentSuccess && (
            <Typography variant="caption" color="error">
              {errors.treatmentSuccess.message}
            </Typography>
          )}
        </Grid>

        {/* Imaging Studies */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.imagingStudies}>
            <InputLabel id="imaging-studies-label" shrink={true}>Imaging Studies</InputLabel>
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
                return selected.toUpperCase();
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
              <MenuItem value="xray">X-ray</MenuItem>
              <MenuItem value="mri">MRI</MenuItem>
              <MenuItem value="ct">CT</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {errors.imagingStudies && (
            <Typography variant="caption" color="error">
              {errors.imagingStudies.message}
            </Typography>
          )}
        </Grid>

        {/* Living Situation */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Living Situation"
            {...register('livingSituation')}
            error={!!errors.livingSituation}
            helperText={errors.livingSituation?.message}
            placeholder="e.g., house, apartment"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Living Details */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Living Details"
            {...register('livingDetails')}
            error={!!errors.livingDetails}
            helperText={errors.livingDetails?.message}
            placeholder="e.g., stairs, single level"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Ambulation */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Ambulation"
            {...register('ambulation')}
            error={!!errors.ambulation}
            helperText={errors.ambulation?.message}
            placeholder="e.g., independent, with assistance"
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Occupation */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Occupation"
            {...register('occupation')}
            error={!!errors.occupation}
            helperText={errors.occupation?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* PCP */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Primary Care Physician"
            {...register('pcp')}
            error={!!errors.pcp}
            helperText={errors.pcp?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Referred By */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Referred By"
            {...register('referredBy')}
            error={!!errors.referredBy}
            helperText={errors.referredBy?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
