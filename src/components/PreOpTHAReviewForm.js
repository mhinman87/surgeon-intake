import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { generatePatientReportText } from '../utils/textGenerator';

const PreOpTHAReviewForm = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

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
    const diagnosis = formatValue(formData.diagnosis);
    const historyChanges = formatValue(formData.historyChanges);
    const hasQuestions = formData.hasQuestions ? formData.hasQuestions.toLowerCase() : '[not specified]';
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents today for a follow up of their ${hipSide} hip ${diagnosis}. Since last seen they have experienced exacerbation of their symptoms and further degradation of quality of life. Orthopedic/medical history changes since last seen consist of ${historyChanges}. At last visit, treatment options were discussed. The patient elected to consider arthroplasty. They were sent for further workup to assist in determining their medical fitness for joint replacement. The patient has otherwise attempted multiple forms of conservative treatment including activity modification, home directed stretching and strengthening, physical therapy, scheduled NSAIDS, Tylenol, cold therapy, and weight loss despite prolonged conservative treatment course of greater than 3 months. The patient has failed to achieve long lasting relief. They consider their symptoms to be significant and degrading to their quality of life and ability to participate in employment and self-care.`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` Questions/concerns: none.`;
    }
    
    return narrative;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
        Review Your Information
      </Typography>

      {/* Patient Summary */}
      <Paper elevation={1} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
          Patient Summary
        </Typography>
        
        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
          {buildNarrative()}
        </Typography>
      </Paper>

      {/* Medical History - Conditional */}
      {formData.includeMedicalHistory === 'yes' && (
        <Paper elevation={1} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
            Medical History
          </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* PCP */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              PCP: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.pcp)}</span>
            </Typography>
          </Box>
          
          {/* DM2 */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              DM2: <span style={{ fontWeight: 'normal' }}>{formData.dm2 === 'yes' ? 'Yes' : formData.dm2 === 'no' ? 'No' : 'not specified'}</span>
              {formData.dm2 === 'yes' && (
                <span>
                  , A1c - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dm2A1c)}</span>, 
                  medications - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dm2Medications)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Cardiac History */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Cardiac history: <span style={{ fontWeight: 'normal' }}>{formData.cardiacHistory === 'yes' ? 'Yes' : formData.cardiacHistory === 'no' ? 'No' : 'not specified'}</span>
              {formData.cardiacHistory === 'yes' && (
                <span>
                  , diagnosis - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiacDiagnosis)}</span>, 
                  procedures - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiacProcedures)}</span>, 
                  cardiologist - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiologist)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* DVT History */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              DVT history: <span style={{ fontWeight: 'normal' }}>{formData.dvtHistory === 'yes' ? 'Yes' : formData.dvtHistory === 'no' ? 'No' : 'not specified'}</span>
              {formData.dvtHistory === 'yes' && (
                <span>
                  , location - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dvtLocation)}</span>, 
                  date - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dvtDate)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* MRSA/SSI */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              MRSA/SSI: <span style={{ fontWeight: 'normal' }}>{formData.mrsaSsi === 'yes' ? 'Yes' : formData.mrsaSsi === 'no' ? 'No' : 'not specified'}</span>
              {formData.mrsaSsi === 'yes' && (
                <span>
                  , location - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.mrsaSsiLocation)}</span>, 
                  date - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.mrsaSsiDate)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Blood thinners */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Blood thinners: <span style={{ fontWeight: 'normal' }}>{formData.bloodThinners === 'yes' ? 'Yes' : formData.bloodThinners === 'no' ? 'No' : 'not specified'}</span>
              {formData.bloodThinners === 'yes' && (
                <span>
                  , medications - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.bloodThinnerMedications)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Immunosuppression */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Immunosuppression: <span style={{ fontWeight: 'normal' }}>{formData.immunosuppression === 'yes' ? 'Yes' : formData.immunosuppression === 'no' ? 'No' : 'not specified'}</span>
              {formData.immunosuppression === 'yes' && (
                <span>
                  , medications - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.immunosuppressionMedications)}</span>, 
                  diagnosis - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.immunosuppressionDiagnosis)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Opioid Use */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Opioid use: <span style={{ fontWeight: 'normal' }}>{formData.opioidUse === 'yes' ? 'Yes' : formData.opioidUse === 'no' ? 'No' : 'not specified'}</span>
              {formData.opioidUse === 'yes' && (
                <span>
                  , medications - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.opioidMedications)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Tobacco Use */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Tobacco use: <span style={{ fontWeight: 'normal' }}>{formData.tobaccoUse === 'yes' ? 'Yes' : formData.tobaccoUse === 'no' ? 'No' : 'not specified'}</span>
              {formData.tobaccoUse === 'yes' && (
                <span>
                  , type - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.tobaccoType)}</span>, 
                  frequency - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.tobaccoFrequency)}</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Referred By */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Referred by: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.referredBy)}</span>
            </Typography>
          </Box>

          {/* Preferred Name */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Preferred name: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.preferredName)}</span>
            </Typography>
          </Box>

          {/* Residence */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Residence: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.residence)}</span>
            </Typography>
          </Box>

          {/* Stairs */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Stairs: <span style={{ fontWeight: 'normal' }}>{formData.hasStairs === 'yes' ? 'Yes' : formData.hasStairs === 'no' ? 'No' : '[not specified]'}</span>
              {formData.hasStairs === 'yes' && (
                <span>
                  , count - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.stairCount)}</span>
                </span>
              )}
            </Typography>
          </Box>

          {/* Support */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Support: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.support)}</span>
            </Typography>
          </Box>

          {/* Ambulatory Capacity */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Ambulatory capacity: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.ambulatoryCapacity)}</span>
            </Typography>
          </Box>

          {/* Occupation */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Occupation: <span style={{ fontWeight: 'normal' }}>{formatValue(formData.occupation)}</span>
            </Typography>
          </Box>
        </Box>
        </Paper>
      )}
    </Box>
  );
};

export default PreOpTHAReviewForm;
