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
} from '@mui/material';

export default function MedicalHistoryForm() {
  const { register, watch, formState: { errors } } = useFormContext();
  
  const dm2 = watch('dm2');
  const cardiacHistory = watch('cardiacHistory');
  const dvtHistory = watch('dvtHistory');
  const mrsaSsi = watch('mrsaSsi');
  const bloodThinners = watch('bloodThinners');
  const immunosuppression = watch('immunosuppression');
  const opioidUse = watch('opioidUse');
  const tobaccoUse = watch('tobaccoUse');
  const hasStairs = watch('hasStairs');

  return (
    <Box>
      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* Preferred Name */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Preferred Name"
            {...register('preferredName')}
            error={!!errors.preferredName}
            helperText={errors.preferredName?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* PCP */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="PCP"
            {...register('pcp')}
            error={!!errors.pcp}
            helperText={errors.pcp?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
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
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* DM2 */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.dm2}>
            <InputLabel id="dm2-label" shrink={true}>DM2</InputLabel>
            <Select
              {...register('dm2')}
              labelId="dm2-label"
              label="DM2"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select DM2 status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.dm2 && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.dm2.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* DM2 A1C - Conditional */}
        {dm2 === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="A1C"
              {...register('dm2A1c')}
              error={!!errors.dm2A1c}
              helperText={errors.dm2A1c?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* DM2 Medications - Conditional */}
        {dm2 === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="DM2 Medications"
              {...register('dm2Medications')}
              error={!!errors.dm2Medications}
              helperText={errors.dm2Medications?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Cardiac History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.cardiacHistory}>
            <InputLabel id="cardiac-history-label" shrink={true}>Cardiac History</InputLabel>
            <Select
              {...register('cardiacHistory')}
              labelId="cardiac-history-label"
              label="Cardiac History"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select cardiac history</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.cardiacHistory && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.cardiacHistory.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Cardiac Diagnosis - Conditional */}
        {cardiacHistory === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Cardiac Diagnosis"
              {...register('cardiacDiagnosis')}
              error={!!errors.cardiacDiagnosis}
              helperText={errors.cardiacDiagnosis?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Cardiac Procedures - Conditional */}
        {cardiacHistory === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Cardiac Procedures"
              {...register('cardiacProcedures')}
              error={!!errors.cardiacProcedures}
              helperText={errors.cardiacProcedures?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Cardiologist - Conditional */}
        {cardiacHistory === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Cardiologist"
              {...register('cardiologist')}
              error={!!errors.cardiologist}
              helperText={errors.cardiologist?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* DVT History */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.dvtHistory}>
            <InputLabel id="dvt-history-label" shrink={true}>DVT History</InputLabel>
            <Select
              {...register('dvtHistory')}
              labelId="dvt-history-label"
              label="DVT History"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select DVT history</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.dvtHistory && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.dvtHistory.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* DVT Location - Conditional */}
        {dvtHistory === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="DVT Location"
              {...register('dvtLocation')}
              error={!!errors.dvtLocation}
              helperText={errors.dvtLocation?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* DVT Date - Conditional */}
        {dvtHistory === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="DVT Date"
              {...register('dvtDate')}
              error={!!errors.dvtDate}
              helperText={errors.dvtDate?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* MRSA/SSI */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.mrsaSsi}>
            <InputLabel id="mrsa-ssi-label" shrink={true}>MRSA/SSI</InputLabel>
            <Select
              {...register('mrsaSsi')}
              labelId="mrsa-ssi-label"
              label="MRSA/SSI"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select MRSA/SSI history</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.mrsaSsi && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.mrsaSsi.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* MRSA/SSI Location - Conditional */}
        {mrsaSsi === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="MRSA/SSI Location"
              {...register('mrsaSsiLocation')}
              error={!!errors.mrsaSsiLocation}
              helperText={errors.mrsaSsiLocation?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* MRSA/SSI Date - Conditional */}
        {mrsaSsi === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="MRSA/SSI Date"
              {...register('mrsaSsiDate')}
              error={!!errors.mrsaSsiDate}
              helperText={errors.mrsaSsiDate?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Blood Thinners */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.bloodThinners}>
            <InputLabel id="blood-thinners-label" shrink={true}>Blood Thinners</InputLabel>
            <Select
              {...register('bloodThinners')}
              labelId="blood-thinners-label"
              label="Blood Thinners"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select blood thinners status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.bloodThinners && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.bloodThinners.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Blood Thinner Medications - Conditional */}
        {bloodThinners === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Blood Thinner Medications"
              {...register('bloodThinnerMedications')}
              error={!!errors.bloodThinnerMedications}
              helperText={errors.bloodThinnerMedications?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Immunosuppression */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.immunosuppression}>
            <InputLabel id="immunosuppression-label" shrink={true}>Immunosuppression</InputLabel>
            <Select
              {...register('immunosuppression')}
              labelId="immunosuppression-label"
              label="Immunosuppression"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select immunosuppression status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.immunosuppression && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.immunosuppression.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Immunosuppression Medications - Conditional */}
        {immunosuppression === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Immunosuppression Medications"
              {...register('immunosuppressionMedications')}
              error={!!errors.immunosuppressionMedications}
              helperText={errors.immunosuppressionMedications?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Immunosuppression Diagnosis - Conditional */}
        {immunosuppression === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Immunosuppression Diagnosis"
              {...register('immunosuppressionDiagnosis')}
              error={!!errors.immunosuppressionDiagnosis}
              helperText={errors.immunosuppressionDiagnosis?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Opioid Use */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.opioidUse}>
            <InputLabel id="opioid-use-label" shrink={true}>Opioid Use</InputLabel>
            <Select
              {...register('opioidUse')}
              labelId="opioid-use-label"
              label="Opioid Use"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select opioid use status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.opioidUse && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.opioidUse.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Opioid Medications - Conditional */}
        {opioidUse === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Opioid Medications"
              {...register('opioidMedications')}
              error={!!errors.opioidMedications}
              helperText={errors.opioidMedications?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Following with Pain Management - Conditional */}
        {opioidUse === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <FormControl fullWidth error={!!errors.painManagement}>
              <InputLabel id="pain-management-label" shrink={true}>Following with Pain Management?</InputLabel>
              <Select
                {...register('painManagement')}
                labelId="pain-management-label"
                label="Following with Pain Management?"
                displayEmpty
                notched
                renderValue={(selected) => {
                  if (!selected) {
                    return <em style={{ color: '#666' }}>Select pain management status</em>;
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
                }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
              {errors.painManagement && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {errors.painManagement.message}
                </Typography>
              )}
            </FormControl>
          </Grid>
        )}

        {/* Pain Management Provider - Conditional */}
        {opioidUse === 'yes' && watch('painManagement') === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Pain Management Provider"
              {...register('painManagementProvider')}
              error={!!errors.painManagementProvider}
              helperText={errors.painManagementProvider?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Tobacco Use */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.tobaccoUse}>
            <InputLabel id="tobacco-use-label" shrink={true}>Tobacco Use</InputLabel>
            <Select
              {...register('tobaccoUse')}
              labelId="tobacco-use-label"
              label="Tobacco Use"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select tobacco use status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.tobaccoUse && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.tobaccoUse.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Tobacco Type - Conditional */}
        {tobaccoUse === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Tobacco Type"
              {...register('tobaccoType')}
              error={!!errors.tobaccoType}
              helperText={errors.tobaccoType?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Tobacco Frequency - Conditional */}
        {tobaccoUse === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Tobacco Frequency"
              {...register('tobaccoFrequency')}
              error={!!errors.tobaccoFrequency}
              helperText={errors.tobaccoFrequency?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Residence */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Residence"
            {...register('residence')}
            error={!!errors.residence}
            helperText={errors.residence?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Has Stairs */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.hasStairs}>
            <InputLabel id="has-stairs-label" shrink={true}>Has Stairs</InputLabel>
            <Select
              {...register('hasStairs')}
              labelId="has-stairs-label"
              label="Has Stairs"
              displayEmpty
              notched
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#666' }}>Select stairs status</em>;
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
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors.hasStairs && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.hasStairs.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Stair Count - Conditional */}
        {hasStairs === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Stair Count"
              {...register('stairCount')}
              error={!!errors.stairCount}
              helperText={errors.stairCount?.message}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                },
              }}
            />
          </Grid>
        )}

        {/* Support */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Support"
            {...register('support')}
            error={!!errors.support}
            helperText={errors.support?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
          />
        </Grid>

        {/* Ambulatory Capacity */}
        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField
            fullWidth
            label="Ambulatory Capacity"
            {...register('ambulatoryCapacity')}
            error={!!errors.ambulatoryCapacity}
            helperText={errors.ambulatoryCapacity?.message}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
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