import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';

export default function OneYearTHAReviewForm() {
  const { watch } = useFormContext();
  const formData = watch();

  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return '[not specified]';
    }
    return value;
  };

  const formatHipSide = (side) => {
    switch (side) {
      case 'right': return 'right';
      case 'left': return 'left';
      default: return '[not specified]';
    }
  };

  const buildNarrative = () => {
    const hipSide = formatHipSide(formData.hipSide);
    const surgeryType = formatValue(formData.surgeryType);
    const surgeryDate = formatValue(formData.surgeryDate);
    const surgeryLocation = formatValue(formData.surgeryLocation);
    const surgeon = formatValue(formData.surgeon);
    const historyChanges = formatValue(formData.historyChanges);
    const fullRecovery = formatValue(formData.fullRecovery);
    const normalActivity = formatValue(formData.normalActivity);
    const symptomRelief = formatValue(formData.symptomRelief);
    const ambulationStatus = formatValue(formData.ambulationStatus);
    const assistiveDevices = formatValue(formData.assistiveDevices);
    const painMedication = formatValue(formData.painMedication);
    const satisfaction = formatValue(formData.satisfaction);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents s/p ${hipSide} ${surgeryType} THA on ${surgeryDate} at ${surgeryLocation} performed by ${surgeon}. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient feels as if they ${fullRecovery} made a full recovery. They ${normalActivity} resumed normal activity and work. The patient has ${symptomRelief} relief of their pre-operative symptoms. The patient is ambulating ${ambulationStatus} assistive devices.`;

    if (formData.ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` ${assistiveDevices}.`;
    }

    narrative += ` They are using ${painMedication} medication for discomfort. The patient ${satisfaction} satisfied with their result.`;

    if (formData.hasQuestions === 'yes') {
      narrative += ` Questions/concerns? Yes - ${questionsDetails}`;
    } else {
      narrative += ` Questions/concerns? No`;
    }

    return narrative;
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Review & Submit
      </Typography>

      {/* Patient Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Patient Summary
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
          {buildNarrative()}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 1-Year Follow-up Information */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          1-Year Follow-up Information
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Hip Side:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.hipSide}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Surgery Type:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.surgeryType}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Surgery Date:
            </Typography>
            <Typography variant="body2">
              {formData.surgeryDate}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Surgery Location:
            </Typography>
            <Typography variant="body2">
              {formData.surgeryLocation}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Surgeon:
            </Typography>
            <Typography variant="body2">
              {formData.surgeon}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              History Changes:
            </Typography>
            <Typography variant="body2">
              {formData.historyChanges}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Full Recovery:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.fullRecovery} made a full recovery
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Normal Activity:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.normalActivity} resumed normal activity and work
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Symptom Relief:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.symptomRelief} relief
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Ambulation:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.ambulationStatus} assistive devices
              {formData.ambulationStatus === 'with' && formData.assistiveDevices && 
                ` (${formData.assistiveDevices})`
              }
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Pain Medication:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.painMedication}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Satisfaction:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.satisfaction} satisfied with their result
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Questions/Concerns:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.hasQuestions}
              {formData.hasQuestions === 'yes' && formData.questionsDetails && 
                ` - ${formData.questionsDetails}`
              }
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
