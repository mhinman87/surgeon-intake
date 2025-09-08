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

const THAComplaintForm = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const complicationsHistory = watch('complicationsHistory');
  const additionalSurgeryHistory = watch('additionalSurgeryHistory');
  const previousSurgeryHistory = watch('previousSurgeryHistory');
  const injurySinceTHA = watch('injurySinceTHA');
  const lumbarSpineHistory = watch('lumbarSpineHistory');

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
        THA Evaluation Assessment
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
            </Select>
          </FormControl>
          {errors.hipSide && (
            <Typography variant="caption" color="error">
              {errors.hipSide.message}
            </Typography>
          )}
        </Grid>

        {/* Original Surgeon */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Original Surgeon"
            {...register('originalSurgeon')}
            error={!!errors.originalSurgeon}
            helperText={errors.originalSurgeon?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Original Location */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Original Surgery Location (City/State)"
            {...register('originalLocation')}
            error={!!errors.originalLocation}
            helperText={errors.originalLocation?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Original Year */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Original Surgery Year"
            {...register('originalYear')}
            error={!!errors.originalYear}
            helperText={errors.originalYear?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

        {/* Complications History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.complicationsHistory}>
            <InputLabel id="complications-history-label" shrink>Complications During Initial Surgery</InputLabel>
            <Select
              {...register('complicationsHistory')}
              labelId="complications-history-label"
              label="Complications During Initial Surgery"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select complications history</em>;
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
          {errors.complicationsHistory && (
            <Typography variant="caption" color="error">
              {errors.complicationsHistory.message}
            </Typography>
          )}
        </Grid>

        {/* Complications Description - only show if positive */}
        {complicationsHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Complications Description"
              {...register('complicationsDescription')}
              error={!!errors.complicationsDescription}
              helperText={errors.complicationsDescription?.message}
              multiline
              rows={3}
              sx={{ textAlign: 'left' }}
            />
          </Grid>
        )}

        {/* Additional Surgery History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.additionalSurgeryHistory}>
            <InputLabel id="additional-surgery-history-label" shrink>Additional Surgery Following THA</InputLabel>
            <Select
              {...register('additionalSurgeryHistory')}
              labelId="additional-surgery-history-label"
              label="Additional Surgery Following THA"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select additional surgery history</em>;
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
          {errors.additionalSurgeryHistory && (
            <Typography variant="caption" color="error">
              {errors.additionalSurgeryHistory.message}
            </Typography>
          )}
        </Grid>

        {/* Additional Surgery Description - only show if positive */}
        {additionalSurgeryHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Additional Surgery Description"
              {...register('additionalSurgeryDescription')}
              error={!!errors.additionalSurgeryDescription}
              helperText={errors.additionalSurgeryDescription?.message}
              multiline
              rows={3}
              sx={{ textAlign: 'left' }}
            />
          </Grid>
        )}

        {/* Previous Surgery History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.previousSurgeryHistory}>
            <InputLabel id="previous-surgery-history-label" shrink>Previous Surgery Prior to THA</InputLabel>
            <Select
              {...register('previousSurgeryHistory')}
              labelId="previous-surgery-history-label"
              label="Previous Surgery Prior to THA"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select previous surgery history</em>;
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
          {errors.previousSurgeryHistory && (
            <Typography variant="caption" color="error">
              {errors.previousSurgeryHistory.message}
            </Typography>
          )}
        </Grid>

        {/* Previous Surgery Description - only show if positive */}
        {previousSurgeryHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Previous Surgery Description"
              {...register('previousSurgeryDescription')}
              error={!!errors.previousSurgeryDescription}
              helperText={errors.previousSurgeryDescription?.message}
              multiline
              rows={3}
              sx={{ textAlign: 'left' }}
            />
          </Grid>
        )}

        {/* Satisfaction Result */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.satisfactionResult}>
            <InputLabel id="satisfaction-result-label" shrink>Satisfaction with Result</InputLabel>
            <Select
              {...register('satisfactionResult')}
              labelId="satisfaction-result-label"
              label="Satisfaction with Result"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select satisfaction with result</em>;
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
          {errors.satisfactionResult && (
            <Typography variant="caption" color="error">
              {errors.satisfactionResult.message}
            </Typography>
          )}
        </Grid>

        {/* Injury Since THA */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.injurySinceTHA}>
            <InputLabel id="injury-since-tha-label" shrink>Injury History Since THA</InputLabel>
            <Select
              {...register('injurySinceTHA')}
              labelId="injury-since-tha-label"
              label="Injury History Since THA"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select injury history since THA</em>;
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
          {errors.injurySinceTHA && (
            <Typography variant="caption" color="error">
              {errors.injurySinceTHA.message}
            </Typography>
          )}
        </Grid>

        {/* Injury Description - only show if positive */}
        {injurySinceTHA === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Injury Description"
              {...register('injuryDescription')}
              error={!!errors.injuryDescription}
              helperText={errors.injuryDescription?.message}
              multiline
              rows={3}
              sx={{ textAlign: 'left' }}
            />
          </Grid>
        )}

        {/* Primary Complaint */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Primary Complaint"
            {...register('primaryComplaint')}
            error={!!errors.primaryComplaint}
            helperText={errors.primaryComplaint?.message}
            sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
          />
        </Grid>

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
              <MenuItem value="unchanged">Unchanged</MenuItem>
              <MenuItem value="worsening">Worsening</MenuItem>
              <MenuItem value="improving">Improving</MenuItem>
            </Select>
          </FormControl>
          {errors.symptomProgression && (
            <Typography variant="caption" color="error">
              {errors.symptomProgression.message}
            </Typography>
          )}
        </Grid>

        {/* Symptom Level Sliders */}
        <Grid item xs={12} sm={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Worst Symptom Level (0-10)</Typography>
          <Slider
            {...register('worstSymptomLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ color: '#1976d2' }}
          />
          {errors.worstSymptomLevel && (
            <Typography variant="caption" color="error">
              {errors.worstSymptomLevel.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography gutterBottom>Best Symptom Level (0-10)</Typography>
          <Slider
            {...register('bestSymptomLevel')}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ color: '#1976d2' }}
          />
          {errors.bestSymptomLevel && (
            <Typography variant="caption" color="error">
              {errors.bestSymptomLevel.message}
            </Typography>
          )}
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
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

export default THAComplaintForm;
