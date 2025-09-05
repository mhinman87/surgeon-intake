import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
} from '@mui/material';

export default function ReviewForm() {
  const { watch } = useFormContext();
  const formData = watch();

  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return 'Not specified';
    }
    return value;
  };

  const renderSection = (title, fields) => (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field.key}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {field.label}:
              </Typography>
              <Typography variant="body1">
                {formatValue(formData[field.key])}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  const chiefComplaintFields = [
    { key: 'chiefComplaint', label: 'Chief Complaint' },
    { key: 'kneeSide', label: 'Knee Side' },
    { key: 'patientName', label: 'Patient Name' },
    { key: 'worseSide', label: 'Worse Side' },
    { key: 'painLocation', label: 'Pain Location' },
    { key: 'recentInjury', label: 'Recent Injury History' },
    { key: 'previousSurgeries', label: 'Previous Knee Surgeries' },
    { key: 'painDuration', label: 'Pain Duration' },
    { key: 'painProgression', label: 'Pain Progression' },
    { key: 'worstPainLevel', label: 'Worst Pain Level' },
    { key: 'bestPainLevel', label: 'Best Pain Level' },
    { key: 'painDescription', label: 'Pain Description' },
    { key: 'aggravatingFactors', label: 'Aggravating Factors' },
    { key: 'alleviatingFactors', label: 'Alleviating Factors' },
    { key: 'associatedSymptoms', label: 'Associated Symptoms' },
    { key: 'attemptedTreatments', label: 'Attempted Treatments' },
    { key: 'treatmentSuccess', label: 'Treatment Success' },
    { key: 'imagingStudies', label: 'Imaging Studies' },
    { key: 'livingSituation', label: 'Living Situation' },
    { key: 'livingDetails', label: 'Living Details' },
    { key: 'ambulation', label: 'Ambulation' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'pcp', label: 'Primary Care Physician' },
    { key: 'referredBy', label: 'Referred By' },
  ];

  const medicalHistoryFields = [
    { key: 'dm2', label: 'DM2' },
    { key: 'dm2A1c', label: 'A1C' },
    { key: 'dm2Medications', label: 'DM2 Medications' },
    { key: 'cardiacHistory', label: 'Cardiac History' },
    { key: 'cardiacDiagnosis', label: 'Cardiac Diagnosis' },
    { key: 'cardiacProcedures', label: 'Cardiac Procedures' },
    { key: 'cardiologist', label: 'Cardiologist' },
    { key: 'dvtHistory', label: 'DVT History' },
    { key: 'dvtLocation', label: 'DVT Location' },
    { key: 'dvtDate', label: 'DVT Date' },
    { key: 'mrsaSsi', label: 'MRSA/SSI' },
    { key: 'mrsaSsiLocation', label: 'MRSA/SSI Location' },
    { key: 'mrsaSsiDate', label: 'MRSA/SSI Date' },
    { key: 'bloodThinners', label: 'Blood Thinners' },
    { key: 'bloodThinnerMedications', label: 'Blood Thinner Medications' },
    { key: 'immunosuppression', label: 'Immunosuppression' },
    { key: 'immunosuppressionMedications', label: 'Immunosuppression Medications' },
    { key: 'immunosuppressionDiagnosis', label: 'Immunosuppression Diagnosis' },
    { key: 'opioidUse', label: 'Opioid Use' },
    { key: 'opioidMedications', label: 'Opioid Medications' },
    { key: 'tobaccoUse', label: 'Tobacco Use' },
    { key: 'tobaccoType', label: 'Tobacco Type' },
    { key: 'tobaccoFrequency', label: 'Tobacco Frequency' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Review Patient Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please review all information before submitting. You can go back to make changes if needed.
      </Typography>

      {renderSection('Chief Complaint & Pain Assessment', chiefComplaintFields)}
      {renderSection('Medical History', medicalHistoryFields)}

      <Paper elevation={2} sx={{ p: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          Ready to Submit
        </Typography>
        <Typography variant="body2">
          All required information has been collected. Click "Submit" to complete the patient intake process.
        </Typography>
      </Paper>
    </Box>
  );
}
