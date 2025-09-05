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

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Chief Complaint & Pain Assessment
      </Typography>
      
      <Grid container spacing={3}>
        {/* Chief Complaint field removed */}
        
        {/* Knee Side */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.kneeSide}>
            <InputLabel>Knee Side</InputLabel>
            <Select
              {...register('kneeSide')}
              label="Knee Side"
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

        {/* Patient Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Patient Name"
            {...register('patientName')}
            error={!!errors.patientName}
            helperText={errors.patientName?.message}
          />
        </Grid>

        {/* Worse Side - only show if bilateral */}
        {kneeSide === 'bilateral' && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.worseSide}>
              <InputLabel>Which side is worse?</InputLabel>
              <Select
                {...register('worseSide')}
                label="Which side is worse?"
              >
                <MenuItem value="right">Right</MenuItem>
                <MenuItem value="left">Left</MenuItem>
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pain Location"
            {...register('painLocation')}
            error={!!errors.painLocation}
            helperText={errors.painLocation?.message}
            placeholder="e.g., medial aspect of the knee"
          />
        </Grid>

        {/* Recent Injury */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.recentInjury}>
            <InputLabel>Recent Injury History</InputLabel>
            <Select
              {...register('recentInjury')}
              label="Recent Injury History"
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

        {/* Previous Surgeries */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Previous Knee Surgeries"
            {...register('previousSurgeries')}
            error={!!errors.previousSurgeries}
            helperText={errors.previousSurgeries?.message}
            placeholder="e.g., None, ACL reconstruction 2019"
          />
        </Grid>

        {/* Pain Duration */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.painDuration}>
            <InputLabel>Pain Duration</InputLabel>
            <Select
              {...register('painDuration')}
              label="Pain Duration"
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.painProgression}>
            <InputLabel>Pain Progression</InputLabel>
            <Select
              {...register('painProgression')}
              label="Pain Progression"
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
        <Grid item xs={12} sm={6}>
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

        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Pain Description"
            {...register('painDescription')}
            error={!!errors.painDescription}
            helperText={errors.painDescription?.message}
            placeholder="Describe the pain in detail"
          />
        </Grid>

        {/* Aggravating Factors */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Aggravating Factors"
            {...register('aggravatingFactors')}
            error={!!errors.aggravatingFactors}
            helperText={errors.aggravatingFactors?.message}
            placeholder="What makes the pain worse?"
          />
        </Grid>

        {/* Alleviating Factors */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Alleviating Factors"
            {...register('alleviatingFactors')}
            error={!!errors.alleviatingFactors}
            helperText={errors.alleviatingFactors?.message}
            placeholder="What helps relieve the pain?"
          />
        </Grid>

        {/* Associated Symptoms */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Associated Symptoms"
            {...register('associatedSymptoms')}
            error={!!errors.associatedSymptoms}
            helperText={errors.associatedSymptoms?.message}
            placeholder="e.g., swelling, stiffness, clicking"
          />
        </Grid>

        {/* Attempted Treatments */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Attempted Treatments"
            {...register('attemptedTreatments')}
            error={!!errors.attemptedTreatments}
            helperText={errors.attemptedTreatments?.message}
            placeholder="What treatments have been tried?"
          />
        </Grid>

        {/* Treatment Success */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.treatmentSuccess}>
            <InputLabel>Treatment Success</InputLabel>
            <Select
              {...register('treatmentSuccess')}
              label="Treatment Success"
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.imagingStudies}>
            <InputLabel>Imaging Studies</InputLabel>
            <Select
              {...register('imagingStudies')}
              label="Imaging Studies"
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Living Situation"
            {...register('livingSituation')}
            error={!!errors.livingSituation}
            helperText={errors.livingSituation?.message}
            placeholder="e.g., house, apartment"
          />
        </Grid>

        {/* Living Details */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Living Details"
            {...register('livingDetails')}
            error={!!errors.livingDetails}
            helperText={errors.livingDetails?.message}
            placeholder="e.g., stairs, single level"
          />
        </Grid>

        {/* Ambulation */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ambulation"
            {...register('ambulation')}
            error={!!errors.ambulation}
            helperText={errors.ambulation?.message}
            placeholder="e.g., independent, with assistance"
          />
        </Grid>

        {/* Occupation */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Occupation"
            {...register('occupation')}
            error={!!errors.occupation}
            helperText={errors.occupation?.message}
          />
        </Grid>

        {/* PCP */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Primary Care Physician"
            {...register('pcp')}
            error={!!errors.pcp}
            helperText={errors.pcp?.message}
          />
        </Grid>

        {/* Referred By */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Referred By"
            {...register('referredBy')}
            error={!!errors.referredBy}
            helperText={errors.referredBy?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
