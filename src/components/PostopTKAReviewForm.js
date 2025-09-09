import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';

export default function PostopTKAReviewForm() {
  const { watch } = useFormContext();
  const formData = watch();

  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return '[not specified]';
    }
    return value;
  };

  const formatKneeSide = (side) => {
    switch (side) {
      case 'right': return 'right';
      case 'left': return 'left';
      default: return '[not specified]';
    }
  };

  const buildNarrative = () => {
    const kneeSide = formatKneeSide(formData.kneeSide);
    const surgeryType = formatValue(formData.surgeryType);
    const surgeryDate = formatValue(formData.surgeryDate);
    const surgeryLocation = formatValue(formData.surgeryLocation);
    const historyChanges = formatValue(formData.historyChanges);
    const progressLevel = formatValue(formData.progressLevel);
    const recoveryPercentage = formatValue(formData.recoveryPercentage);
    const therapyWeeks = formatValue(formData.therapyWeeks);
    const therapyLocation = formatValue(formData.therapyLocation);
    const therapyVisitsPerWeek = formatValue(formData.therapyVisitsPerWeek);
    const therapyDischarged = formatValue(formData.therapyDischarged);
    const ambulationStatus = formatValue(formData.ambulationStatus);
    const assistiveDevices = formatValue(formData.assistiveDevices);
    const painMedication = formatValue(formData.painMedication);
    const symptomRelief = formatValue(formData.symptomRelief);
    const satisfaction = formatValue(formData.satisfaction);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);
    const kneeExtension = formatValue(formData.kneeExtension);
    const kneeFlexion = formatValue(formData.kneeFlexion);

    let narrative = `presents s/p ${kneeSide} ${surgeryType} TKA on ${surgeryDate} at ${surgeryLocation} performed by myself. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient feels as if they are making ${progressLevel} progress and feels ${recoveryPercentage} recovered. They have participated in ${therapyWeeks} weeks of therapy at ${therapyLocation} ${therapyVisitsPerWeek} visits per week. They ${therapyDischarged} been discharged from therapy. The patient is ambulating ${ambulationStatus} assistive devices.`;

    if (formData.ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` ${assistiveDevices}.`;
    }

    narrative += ` They are using ${painMedication} medication for discomfort. The patient has ${symptomRelief} relief of their pre-operative symptoms. The patient ${satisfaction} satisfied with their results thus far.`;

    if (formData.hasQuestions === 'yes') {
      narrative += ` Questions/concerns? Yes - ${questionsDetails}`;
    } else {
      narrative += ` Questions/concerns? No`;
    }

    narrative += ` Knee ROM at last therapy visit - ${kneeExtension} deg extension, ${kneeFlexion} deg flexion`;

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

      {/* Post-operative Information */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          Post-operative Information
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Knee Side:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.kneeSide}
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
              History Changes:
            </Typography>
            <Typography variant="body2">
              {formData.historyChanges}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Progress Level:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.progressLevel}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Recovery Percentage:
            </Typography>
            <Typography variant="body2">
              {formData.recoveryPercentage}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Therapy Details:
            </Typography>
            <Typography variant="body2">
              {formData.therapyWeeks} weeks at {formData.therapyLocation}, {formData.therapyVisitsPerWeek} visits per week
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Therapy Discharge:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.therapyDischarged} been discharged
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
              Symptom Relief:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.symptomRelief} relief
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Satisfaction:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.satisfaction} satisfied
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

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Knee ROM:
            </Typography>
            <Typography variant="body2">
              {formData.kneeExtension}° extension, {formData.kneeFlexion}° flexion
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
