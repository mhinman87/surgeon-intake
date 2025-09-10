import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import MedicalHistoryForm from './MedicalHistoryForm';

export default function MedicalHistoryPrompt() {
  const { register, watch, formState: { errors } } = useFormContext();
  const includeMedicalHistory = watch('includeMedicalHistory');

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Medical, Social & Referral History
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Would you like to add Medical, Social & Referral History?
      </Typography>

      <FormControl fullWidth error={!!errors.includeMedicalHistory}>
        <InputLabel id="medical-history-label" shrink={true}>Include Medical History</InputLabel>
        <Select
          {...register('includeMedicalHistory')}
          labelId="medical-history-label"
          label="Include Medical History"
          displayEmpty
          notched
          renderValue={(selected) => {
            if (!selected) {
              return <em style={{ color: '#666' }}>Select option</em>;
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
        {errors.includeMedicalHistory && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            {errors.includeMedicalHistory.message}
          </Typography>
        )}
      </FormControl>

      {/* Show medical history form immediately when "yes" is selected */}
      {includeMedicalHistory === 'yes' && (
        <Box sx={{ mt: 4 }}>
          <MedicalHistoryForm />
        </Box>
      )}
    </Box>
  );
}
