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

export default function FollowupKneeComplaintForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  const treatmentPlan = watch('treatmentPlan');
  const hasQuestions = watch('hasQuestions');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Follow-up Information
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
              <MenuItem value="bilateral">Bilateral</MenuItem>
            </Select>
            {errors.kneeSide && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.kneeSide.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Clinic History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Clinic History"
            {...register('clinicHistory')}
            error={!!errors.clinicHistory}
            helperText={errors.clinicHistory?.message}
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
            <InputLabel id="treatment-plan-label" shrink notched>
              Treatment Plan
            </InputLabel>
            <Select
              labelId="treatment-plan-label"
              id="treatmentPlan"
              {...register('treatmentPlan')}
              displayEmpty
              notched
              label="Treatment Plan"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select treatment plan</em>}
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
              <MenuItem value="observation">Observation</MenuItem>
              <MenuItem value="medication">Medication</MenuItem>
              <MenuItem value="corticosteroid injections">Corticosteroid Injections</MenuItem>
              <MenuItem value="physical therapy">Physical Therapy</MenuItem>
              <MenuItem value="imaging">Imaging</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.treatmentPlan && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.treatmentPlan.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Treatment Plan Other - Conditional */}
        {treatmentPlan === 'other' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Please specify other treatment plan"
              {...register('treatmentPlanOther')}
              error={!!errors.treatmentPlanOther}
              helperText={errors.treatmentPlanOther?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Symptoms Status */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.symptomsStatus}>
            <InputLabel id="symptoms-status-label" shrink notched>
              Symptoms Status
            </InputLabel>
            <Select
              labelId="symptoms-status-label"
              id="symptomsStatus"
              {...register('symptomsStatus')}
              displayEmpty
              notched
              label="Symptoms Status"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select symptoms status</em>}
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

        {/* Treatment Consideration */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.treatmentConsideration}>
            <InputLabel id="treatment-consideration-label" shrink notched>
              Treatment Consideration
            </InputLabel>
            <Select
              labelId="treatment-consideration-label"
              id="treatmentConsideration"
              {...register('treatmentConsideration')}
              displayEmpty
              notched
              label="Treatment Consideration"
              renderValue={(value) => value ? value : <em style={{ fontStyle: 'italic', color: '#666' }}>Select treatment consideration</em>}
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
              <MenuItem value="continuing">Continuing</MenuItem>
              <MenuItem value="changing">Changing</MenuItem>
            </Select>
            {errors.treatmentConsideration && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.treatmentConsideration.message}
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
      </Grid>
    </Box>
  );
}
