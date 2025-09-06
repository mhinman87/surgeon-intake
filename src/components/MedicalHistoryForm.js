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
  Divider,
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Medical History
      </Typography>
      
      <Grid container spacing={3} sx={{ '& .MuiGrid-item': { width: '100%', maxWidth: '100%' } }}>
        {/* DM2 Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.dm2}>
            <InputLabel id="dm2-label" shrink>DM2</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.dm2 && (
            <Typography variant="caption" color="error">
              {errors.dm2.message}
            </Typography>
          )}
        </Grid>

        {dm2 === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="A1C"
                {...register('dm2A1c')}
                error={!!errors.dm2A1c}
                helperText={errors.dm2A1c?.message}
                placeholder="e.g., 7.2%"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="DM2 Medications"
                {...register('dm2Medications')}
                error={!!errors.dm2Medications}
                helperText={errors.dm2Medications?.message}
                placeholder="e.g., Metformin 500mg BID"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
          </>
        )}

        {/* Cardiac History Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.cardiacHistory}>
            <InputLabel id="cardiac-history-label" shrink>Cardiac History</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.cardiacHistory && (
            <Typography variant="caption" color="error">
              {errors.cardiacHistory.message}
            </Typography>
          )}
        </Grid>

        {cardiacHistory === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Cardiac Diagnosis"
                {...register('cardiacDiagnosis')}
                error={!!errors.cardiacDiagnosis}
                helperText={errors.cardiacDiagnosis?.message}
                placeholder="e.g., CAD, CHF"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Cardiac Procedures"
                {...register('cardiacProcedures')}
                error={!!errors.cardiacProcedures}
                helperText={errors.cardiacProcedures?.message}
                placeholder="e.g., CABG, stent"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Cardiologist"
                {...register('cardiologist')}
                error={!!errors.cardiologist}
                helperText={errors.cardiologist?.message}
                placeholder="Dr. Smith"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
          </>
        )}

        {/* DVT History Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.dvtHistory}>
            <InputLabel id="dvt-history-label" shrink>DVT History</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.dvtHistory && (
            <Typography variant="caption" color="error">
              {errors.dvtHistory.message}
            </Typography>
          )}
        </Grid>

        {dvtHistory === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="DVT Location"
                {...register('dvtLocation')}
                error={!!errors.dvtLocation}
                helperText={errors.dvtLocation?.message}
                placeholder="e.g., left leg"
                sx={{ textAlign: 'left', '& .MuiInputBase-input': { padding: '20px 14px' } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="DVT Date"
                {...register('dvtDate')}
                error={!!errors.dvtDate}
                helperText={errors.dvtDate?.message}
                placeholder="MM/YYYY"
              />
            </Grid>
          </>
        )}

        {/* MRSA/SSI Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.mrsaSsi}>
            <InputLabel id="mrsa-ssi-label" shrink>MRSA/SSI</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.mrsaSsi && (
            <Typography variant="caption" color="error">
              {errors.mrsaSsi.message}
            </Typography>
          )}
        </Grid>

        {mrsaSsi === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="MRSA/SSI Location"
                {...register('mrsaSsiLocation')}
                error={!!errors.mrsaSsiLocation}
                helperText={errors.mrsaSsiLocation?.message}
                placeholder="e.g., surgical site"
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="MRSA/SSI Date"
                {...register('mrsaSsiDate')}
                error={!!errors.mrsaSsiDate}
                helperText={errors.mrsaSsiDate?.message}
                placeholder="MM/YYYY"
              />
            </Grid>
          </>
        )}

        {/* Blood Thinners Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.bloodThinners}>
            <InputLabel id="blood-thinners-label" shrink>Blood Thinners</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.bloodThinners && (
            <Typography variant="caption" color="error">
              {errors.bloodThinners.message}
            </Typography>
          )}
        </Grid>

        {bloodThinners === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Blood Thinner Medications"
              {...register('bloodThinnerMedications')}
              error={!!errors.bloodThinnerMedications}
              helperText={errors.bloodThinnerMedications?.message}
              placeholder="e.g., Warfarin 5mg daily"
            />
          </Grid>
        )}

        {/* Immunosuppression Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.immunosuppression}>
            <InputLabel id="immunosuppression-label" shrink>Immunosuppression</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.immunosuppression && (
            <Typography variant="caption" color="error">
              {errors.immunosuppression.message}
            </Typography>
          )}
        </Grid>

        {immunosuppression === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Immunosuppression Medications"
                {...register('immunosuppressionMedications')}
                error={!!errors.immunosuppressionMedications}
                helperText={errors.immunosuppressionMedications?.message}
                placeholder="e.g., Prednisone, Methotrexate"
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Immunosuppression Diagnosis"
                {...register('immunosuppressionDiagnosis')}
                error={!!errors.immunosuppressionDiagnosis}
                helperText={errors.immunosuppressionDiagnosis?.message}
                placeholder="e.g., Rheumatoid Arthritis"
              />
            </Grid>
          </>
        )}

        {/* Opioid Use Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.opioidUse}>
            <InputLabel id="opioid-use-label" shrink>Opioid Use</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.opioidUse && (
            <Typography variant="caption" color="error">
              {errors.opioidUse.message}
            </Typography>
          )}
        </Grid>

        {opioidUse === 'yes' && (
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField
              fullWidth
              label="Opioid Medications"
              {...register('opioidMedications')}
              error={!!errors.opioidMedications}
              helperText={errors.opioidMedications?.message}
              placeholder="e.g., Oxycodone 10mg TID"
            />
          </Grid>
        )}

        {/* Tobacco Use Section */}

        <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
          <FormControl fullWidth error={!!errors.tobaccoUse}>
            <InputLabel id="tobacco-use-label" shrink>Tobacco Use</InputLabel>
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
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          {errors.tobaccoUse && (
            <Typography variant="caption" color="error">
              {errors.tobaccoUse.message}
            </Typography>
          )}
        </Grid>

        {tobaccoUse === 'yes' && (
          <>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Tobacco Type"
                {...register('tobaccoType')}
                error={!!errors.tobaccoType}
                helperText={errors.tobaccoType?.message}
                placeholder="e.g., cigarettes, cigars"
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <TextField
                fullWidth
                label="Tobacco Frequency"
                {...register('tobaccoFrequency')}
                error={!!errors.tobaccoFrequency}
                helperText={errors.tobaccoFrequency?.message}
                placeholder="e.g., 1 pack/day"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
