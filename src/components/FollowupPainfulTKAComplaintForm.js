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

      <Grid container spacing={3}>
        {/* Knee Side */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.kneeSide}>
            <InputLabel id="knee-side-label" shrink notched>
              Knee Side
            </InputLabel>
            <Select
              labelId="knee-side-label"
              id="kneeSide"
              {...register('kneeSide')}
              displayEmpty
              renderValue={(value) => value || 'Select knee side'}
              sx={{
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

        {/* Known History */}
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.treatmentPlan}>
            <InputLabel id="treatment-plan-label" shrink notched>
              Treatment Plan
            </InputLabel>
            <Select
              labelId="treatment-plan-label"
              id="treatmentPlan"
              {...register('treatmentPlan')}
              displayEmpty
              renderValue={(value) => value || 'Select treatment plan'}
              sx={{
                '& .MuiSelect-select': {
                  padding: '16.5px 14px',
                },
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
          <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.symptomsStatus}>
            <InputLabel id="symptoms-status-label" shrink notched>
              Symptoms Status
            </InputLabel>
            <Select
              labelId="symptoms-status-label"
              id="symptomsStatus"
              {...register('symptomsStatus')}
              displayEmpty
              renderValue={(value) => value || 'Select symptoms status'}
              sx={{
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

        {/* Questions/Concerns */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.hasQuestions}>
            <InputLabel id="has-questions-label" shrink notched>
              Questions/Concerns
            </InputLabel>
            <Select
              labelId="has-questions-label"
              id="hasQuestions"
              {...register('hasQuestions')}
              displayEmpty
              renderValue={(value) => value || 'Select questions/concerns status'}
              sx={{
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
          <Grid item xs={12}>
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
