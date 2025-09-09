import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';

export default function UnplannedTHAReviewForm() {
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
    const returnReason = formatValue(formData.returnReason);
    const injuryHistory = formatValue(formData.injuryHistory);
    const injuryDetails = formatValue(formData.injuryDetails);
    const attemptedRelief = formatValue(formData.attemptedRelief);
    const reliefSuccess = formatValue(formData.reliefSuccess);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const aggravatedBy = formatValue(formData.aggravatedBy);
    const alleviatedBy = formatValue(formData.alleviatedBy);
    const painMedication = formatValue(formData.painMedication);
    const ambulationStatus = formatValue(formData.ambulationStatus);
    const assistiveDevices = formatValue(formData.assistiveDevices);
    const normalActivity = formatValue(formData.normalActivity);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents s/p ${hipSide} ${surgeryType} THA on ${surgeryDate} at ${surgeryLocation} performed by myself. The patient was last seen at their post-op visit and found to be progressing within normal limits. The next planned follow-up was to be at 1 year following surgery. The patient returns early today due to ${returnReason}. Since last visit there is ${injuryHistory} injury history.`;

    if (formData.injuryHistory === 'positive' && injuryDetails && injuryDetails !== '[not specified]') {
      narrative += ` ${injuryDetails}.`;
    }

    narrative += ` The patient has attempted ${attemptedRelief} for relief with ${reliefSuccess} success. The patient's associated symptoms are ${associatedSymptoms}. The symptoms are aggravated by ${aggravatedBy} and alleviated by ${alleviatedBy}. They are using ${painMedication} medication for discomfort. The patient is ambulating ${ambulationStatus} assistive devices.`;

    if (formData.ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` ${assistiveDevices}.`;
    }

    narrative += ` They ${normalActivity} returned to normal daily activity.`;

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

      {/* Unplanned Visit Information */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          Unplanned Visit Information
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
              Return Reason:
            </Typography>
            <Typography variant="body2">
              {formData.returnReason}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Injury History:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.injuryHistory}
              {formData.injuryHistory === 'positive' && formData.injuryDetails && 
                ` - ${formData.injuryDetails}`
              }
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Attempted Relief:
            </Typography>
            <Typography variant="body2">
              {formData.attemptedRelief}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Relief Success:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.reliefSuccess} success
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Associated Symptoms:
            </Typography>
            <Typography variant="body2">
              {formData.associatedSymptoms}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Aggravated By:
            </Typography>
            <Typography variant="body2">
              {formData.aggravatedBy}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Alleviated By:
            </Typography>
            <Typography variant="body2">
              {formData.alleviatedBy}
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
              Normal Activity:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.normalActivity} returned to normal daily activity
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
