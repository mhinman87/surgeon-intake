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

export default function PostopTKAComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const ambulationStatus = watch('ambulationStatus');
  const hasQuestions = watch('hasQuestions');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Post-operative Information
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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

        {/* Progress Level */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.progressLevel}>
            <InputLabel id="progress-level-label" shrink notched>
              Progress Level
            </InputLabel>
            <Select
              labelId="progress-level-label"
              id="progressLevel"
              {...register('progressLevel')}
              displayEmpty
              notched
              label="Progress Level"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select progress level</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="minimal">Minimal</MenuItem>
              <MenuItem value="mild">Mild</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="significant">Significant</MenuItem>
            </Select>
            {errors.progressLevel && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.progressLevel.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Recovery Percentage */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Recovery Percentage"
            {...register('recoveryPercentage')}
            error={!!errors.recoveryPercentage}
            helperText={errors.recoveryPercentage?.message}
            placeholder="e.g., 75%"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Therapy Weeks */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Therapy Weeks"
            {...register('therapyWeeks')}
            error={!!errors.therapyWeeks}
            helperText={errors.therapyWeeks?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Therapy Location */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Therapy Location"
            {...register('therapyLocation')}
            error={!!errors.therapyLocation}
            helperText={errors.therapyLocation?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Therapy Visits Per Week */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Therapy Visits Per Week"
            {...register('therapyVisitsPerWeek')}
            error={!!errors.therapyVisitsPerWeek}
            helperText={errors.therapyVisitsPerWeek?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Therapy Discharged */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.therapyDischarged}>
            <InputLabel id="therapy-discharged-label" shrink notched>
              Therapy Discharge Status
            </InputLabel>
            <Select
              labelId="therapy-discharged-label"
              id="therapyDischarged"
              {...register('therapyDischarged')}
              displayEmpty
              notched
              label="Therapy Discharge Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select therapy discharge status</em>}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="have">Have been discharged</MenuItem>
              <MenuItem value="have not">Have not been discharged</MenuItem>
            </Select>
            {errors.therapyDischarged && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.therapyDischarged.message}
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
              }}
            >
              <MenuItem value="is">Is satisfied</MenuItem>
              <MenuItem value="is not">Is not satisfied</MenuItem>
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
                  borderColor: '#1976d2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
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

        {/* Knee ROM Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
            Knee ROM at Last Therapy Visit
          </Typography>
        </Grid>

        {/* Knee Extension */}
        <Grid item xs={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Extension (degrees)"
            {...register('kneeExtension')}
            error={!!errors.kneeExtension}
            helperText={errors.kneeExtension?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Knee Flexion */}
        <Grid item xs={6} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Flexion (degrees)"
            {...register('kneeFlexion')}
            error={!!errors.kneeFlexion}
            helperText={errors.kneeFlexion?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
