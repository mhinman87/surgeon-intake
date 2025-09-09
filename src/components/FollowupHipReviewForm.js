import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';

export default function FollowupHipReviewForm() {
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
      case 'bilateral': return 'bilateral';
      default: return '[not specified]';
    }
  };

  const buildNarrative = () => {
    const hipSide = formatHipSide(formData.hipSide);
    const clinicHistory = formatValue(formData.clinicHistory);
    const treatmentPlan = formatValue(formData.treatmentPlan);
    const treatmentPlanOther = formatValue(formData.treatmentPlanOther);
    const symptomsStatus = formatValue(formData.symptomsStatus);
    const historyChanges = formatValue(formData.historyChanges);
    const treatmentConsideration = formatValue(formData.treatmentConsideration);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents for ${hipSide} hip follow-up. They are known to my clinic for history of ${clinicHistory}. At last visit, the treatment plan consisted of ${treatmentPlan}`;

    if (formData.treatmentPlan === 'other' && treatmentPlanOther && treatmentPlanOther !== '[not specified]') {
      narrative += ` (${treatmentPlanOther})`;
    }

    narrative += `. The symptoms are ${symptomsStatus}. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient is considering ${treatmentConsideration} their current treatment plan.`;

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

      {/* Follow-up Information */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          Follow-up Information
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
              Clinic History:
            </Typography>
            <Typography variant="body2">
              {formData.clinicHistory}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Treatment Plan:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.treatmentPlan}
              {formData.treatmentPlan === 'other' && formData.treatmentPlanOther && 
                ` (${formData.treatmentPlanOther})`
              }
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '200px' }}>
              Symptoms Status:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.symptomsStatus}
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
              Treatment Consideration:
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {formData.treatmentConsideration}
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
