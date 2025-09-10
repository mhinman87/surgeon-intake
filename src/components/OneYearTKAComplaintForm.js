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

export default function OneYearTKAComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const ambulationStatus = watch('ambulationStatus');
  const hasQuestions = watch('hasQuestions');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        1-Year Follow-up Information
      </Typography>

      <Grid container spacing={3}>
        {/* Knee Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.kneeSide}>
            <InputLabel id="knee-side-label" shrink notched>
              Knee Side
            </InputLabel>
            <Select
              labelId="knee-side-label"
              id="kneeSide"
              {...register('kneeSide')}
              displayEmpty
              notched
              label="Knee Side"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select knee side</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
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

        {/* Surgery Type */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.surgeryType}>
            <InputLabel id="surgery-type-label" shrink notched>
              Surgery Type
            </InputLabel>
            <Select
              labelId="surgery-type-label"
              id="surgeryType"
              {...register('surgeryType')}
              displayEmpty
              notched
              label="Surgery Type"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select surgery type</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="primary">Primary</MenuItem>
              <MenuItem value="revision">Revision</MenuItem>
            </Select>
            {errors.surgeryType && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.surgeryType.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Surgery Date */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Surgery Date"
            {...register('surgeryDate')}
            error={!!errors.surgeryDate}
            helperText={errors.surgeryDate?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Surgery Location */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Surgery Location"
            {...register('surgeryLocation')}
            error={!!errors.surgeryLocation}
            helperText={errors.surgeryLocation?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Surgeon */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Surgeon"
            {...register('surgeon')}
            error={!!errors.surgeon}
            helperText={errors.surgeon?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

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

        {/* Full Recovery */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.fullRecovery}>
            <InputLabel id="full-recovery-label" shrink notched>
              Full Recovery Status
            </InputLabel>
            <Select
              labelId="full-recovery-label"
              id="fullRecovery"
              {...register('fullRecovery')}
              displayEmpty
              notched
              label="Full Recovery Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select full recovery status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="have">Have made a full recovery</MenuItem>
              <MenuItem value="have not">Have not made a full recovery</MenuItem>
            </Select>
            {errors.fullRecovery && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.fullRecovery.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Normal Activity */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.normalActivity}>
            <InputLabel id="normal-activity-label" shrink notched>
              Normal Activity Status
            </InputLabel>
            <Select
              labelId="normal-activity-label"
              id="normalActivity"
              {...register('normalActivity')}
              displayEmpty
              notched
              label="Normal Activity Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select normal activity status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="have">Have resumed normal activity and work</MenuItem>
              <MenuItem value="have not">Have not resumed normal activity and work</MenuItem>
            </Select>
            {errors.normalActivity && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.normalActivity.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Symptom Relief */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.symptomRelief}>
            <InputLabel id="symptom-relief-label" shrink notched>
              Symptom Relief Level
            </InputLabel>
            <Select
              labelId="symptom-relief-label"
              id="symptomRelief"
              {...register('symptomRelief')}
              displayEmpty
              notched
              label="Symptom Relief Level"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select symptom relief level</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="minimal">Minimal relief</MenuItem>
              <MenuItem value="mild">Mild relief</MenuItem>
              <MenuItem value="moderate">Moderate relief</MenuItem>
              <MenuItem value="significant">Significant relief</MenuItem>
            </Select>
            {errors.symptomRelief && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.symptomRelief.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Ambulation Status */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.ambulationStatus}>
            <InputLabel id="ambulation-status-label" shrink notched>
              Ambulation Status
            </InputLabel>
            <Select
              labelId="ambulation-status-label"
              id="ambulationStatus"
              {...register('ambulationStatus')}
              displayEmpty
              notched
              label="Ambulation Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select ambulation status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="with">With assistive devices</MenuItem>
              <MenuItem value="without">Without assistive devices</MenuItem>
            </Select>
            {errors.ambulationStatus && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.ambulationStatus.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Assistive Devices - Conditional */}
        {ambulationStatus === 'with' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Assistive Devices"
              {...register('assistiveDevices')}
              error={!!errors.assistiveDevices}
              helperText={errors.assistiveDevices?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Pain Medication */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.painMedication}>
            <InputLabel id="pain-medication-label" shrink notched>
              Pain Medication
            </InputLabel>
            <Select
              labelId="pain-medication-label"
              id="painMedication"
              {...register('painMedication')}
              displayEmpty
              notched
              label="Pain Medication"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select pain medication status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="no">No pain medication</MenuItem>
              <MenuItem value="over-the-counter">Over-the-counter pain medication</MenuItem>
              <MenuItem value="prescription">Prescription pain medication</MenuItem>
            </Select>
            {errors.painMedication && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.painMedication.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Satisfaction */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.satisfaction}>
            <InputLabel id="satisfaction-label" shrink notched>
              Satisfaction Status
            </InputLabel>
            <Select
              labelId="satisfaction-label"
              id="satisfaction"
              {...register('satisfaction')}
              displayEmpty
              notched
              label="Satisfaction Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select satisfaction status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="is">Is satisfied with their result</MenuItem>
              <MenuItem value="is not">Is not satisfied with their result</MenuItem>
            </Select>
            {errors.satisfaction && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.satisfaction.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Questions/Concerns */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hasQuestions}>
            <InputLabel id="has-questions-label" shrink notched>
              Questions/Concerns
            </InputLabel>
            <Select
              labelId="has-questions-label"
              id="hasQuestions"
              {...register('hasQuestions')}
              displayEmpty
              notched
              label="Questions/Concerns"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select questions/concerns status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06B6D4',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
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
