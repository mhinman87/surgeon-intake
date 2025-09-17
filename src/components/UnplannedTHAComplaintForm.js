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

export default function UnplannedTHAComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const injuryHistory = watch('injuryHistory');
  const ambulationStatus = watch('ambulationStatus');
  const hasQuestions = watch('hasQuestions');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Unplanned Visit Information
      </Typography>

      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* Hip Side */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hipSide}>
            <InputLabel id="hip-side-label" shrink notched>
              Hip Side
            </InputLabel>
            <Select
              labelId="hip-side-label"
              id="hipSide"
              {...register('hipSide')}
              value={watch('hipSide') || ''}
              displayEmpty
              notched
              label="Hip Side"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select hip side</em>}
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
            {errors.hipSide && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.hipSide.message}
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
              value={watch('surgeryType') || ''}
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

        {/* Return Reason */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Return Reason"
            {...register('returnReason')}
            error={!!errors.returnReason}
            helperText={errors.returnReason?.message}
            multiline
            rows={3}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Injury History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.injuryHistory}>
            <InputLabel id="injury-history-label" shrink notched>
              Injury History
            </InputLabel>
            <Select
              labelId="injury-history-label"
              id="injuryHistory"
              {...register('injuryHistory')}
              value={watch('injuryHistory') || ''}
              displayEmpty
              notched
              label="Injury History"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select injury history</em>}
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
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
            {errors.injuryHistory && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.injuryHistory.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Injury Details - Conditional */}
        {injuryHistory === 'positive' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Injury Details"
              {...register('injuryDetails')}
              error={!!errors.injuryDetails}
              helperText={errors.injuryDetails?.message}
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

        {/* Attempted Relief */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Attempted Relief"
            {...register('attemptedRelief')}
            error={!!errors.attemptedRelief}
            helperText={errors.attemptedRelief?.message}
            multiline
            rows={3}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Relief Success */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.reliefSuccess}>
            <InputLabel id="relief-success-label" shrink notched>
              Relief Success Level
            </InputLabel>
            <Select
              labelId="relief-success-label"
              id="reliefSuccess"
              {...register('reliefSuccess')}
              value={watch('reliefSuccess') || ''}
              displayEmpty
              notched
              label="Relief Success Level"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select relief success level</em>}
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
              <MenuItem value="no">No success</MenuItem>
              <MenuItem value="minimal">Minimal success</MenuItem>
              <MenuItem value="mild">Mild success</MenuItem>
              <MenuItem value="moderate">Moderate success</MenuItem>
              <MenuItem value="significant">Significant success</MenuItem>
            </Select>
            {errors.reliefSuccess && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.reliefSuccess.message}
              </Typography>
            )}
          </FormControl>
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
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Aggravated By */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Aggravated By"
            {...register('aggravatedBy')}
            error={!!errors.aggravatedBy}
            helperText={errors.aggravatedBy?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Alleviated By */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Alleviated By"
            {...register('alleviatedBy')}
            error={!!errors.alleviatedBy}
            helperText={errors.alleviatedBy?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

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
              <MenuItem value="have">Have returned to normal daily activity</MenuItem>
              <MenuItem value="have not">Have not returned to normal daily activity</MenuItem>
            </Select>
            {errors.normalActivity && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.normalActivity.message}
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
