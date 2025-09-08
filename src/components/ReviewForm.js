import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Typography,
  Box,
  Paper,
} from '@mui/material';

export default function ReviewForm() {
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
      case 'bilateral': return 'bilateral';
      default: return '[not specified]';
    }
  };

  const formatInjuryHistory = (injury) => {
    switch (injury) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return '[not specified]';
    }
  };

  const formatImaging = (imaging) => {
    switch (imaging) {
      case 'none': return 'none';
      case 'xray': return 'X-ray';
      case 'mri': return 'MRI';
      case 'ct': return 'CT';
      case 'other': return 'other';
      default: return '[not specified]';
    }
  };

  const formatSuccess = (success) => {
    switch (success) {
      case 'excellent': return 'excellent';
      case 'good': return 'good';
      case 'fair': return 'fair';
      case 'poor': return 'poor';
      case 'none': return 'no';
      default: return '[not specified]';
    }
  };

  // Build the narrative paragraph
  const buildNarrative = () => {
    const kneeSide = formatKneeSide(formData.kneeSide);
    const worseSide = formData.kneeSide === 'bilateral' ? formatValue(formData.worseSide) : '';
    const painLocation = formatValue(formData.painLocation);
    const recentInjury = formatInjuryHistory(formData.recentInjury);
    const injuryDescription = formatValue(formData.injuryDescription);
    const previousSurgeries = formatValue(formData.previousSurgeries);
    const painDuration = formatValue(formData.painDuration);
    const painProgression = formatValue(formData.painProgression);
    const worstPain = formatValue(formData.worstPainLevel);
    const bestPain = formatValue(formData.bestPainLevel);
    const painDescription = formatValue(formData.painDescription);
    const aggravatingFactors = formatValue(formData.aggravatingFactors);
    const alleviatingFactors = formatValue(formData.alleviatingFactors);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const attemptedTreatments = formatValue(formData.attemptedTreatments);
    const treatmentSuccess = formatSuccess(formData.treatmentSuccess);
    const imagingStudies = formatImaging(formData.imagingStudies);

    let narrative = `presents for ${kneeSide} knee pain.`;
    
    if (formData.kneeSide === 'bilateral' && worseSide && worseSide !== '[not specified]') {
      if (worseSide === 'equally') {
        narrative += ` Right and left are equally painful.`;
      } else {
        narrative += ` The ${worseSide} is worse.`;
      }
    }
    
    narrative += ` The pain is located at the ${painLocation} aspect of the knee(s). There is a ${recentInjury} history of injury.`;
    
    if (formData.recentInjury === 'positive' && injuryDescription && injuryDescription !== '[not specified]') {
      narrative += ` The injury was ${injuryDescription}.`;
    }
    
    narrative += ` Previous knee surgeries consist of ${previousSurgeries}. The symptoms have been present for ${painDuration}. The patient's symptoms have been ${painProgression}. At worst the pain is rated as a ${worstPain} out of 10. At best, the pain is rated as a ${bestPain} out of 10. The patient's pain is described as ${painDescription}. The symptoms are aggravated by ${aggravatingFactors} and alleviated by ${alleviatingFactors}. The patient has associated symptoms consisting of ${associatedSymptoms}. Thus far, the patient has attempted ${attemptedTreatments} for relief with ${treatmentSuccess} success. Previous imaging studies consist of ${imagingStudies}.`;

    return narrative;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Patient Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please review the patient summary before submitting. You can go back to make changes if needed.
      </Typography>

      <Paper elevation={1} sx={{ p: 4, mb: 3 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
          {buildNarrative()}
        </Typography>
      </Paper>

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
              DM2: <span style={{ fontWeight: 'normal' }}>{formData.dm2 === 'yes' ? 'Yes' : formData.dm2 === 'no' ? 'No' : '[not specified]'}</span>
              {formData.dm2 === 'yes' && (
                <span>
                  , A1C <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dm2A1c)}</span>, 
                  medications - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dm2Medications)}</span>
                </span>
              )}
            </Typography>
          </Box>

          {/* Cardiac History */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Cardiac history: <span style={{ fontWeight: 'normal' }}>{formData.cardiacHistory === 'yes' ? 'Yes' : formData.cardiacHistory === 'no' ? 'No' : '[not specified]'}</span>
              {formData.cardiacHistory === 'yes' && (
                <span>
                  , diagnosis - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiacDiagnosis)}</span>, 
                  procedures - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiacProcedures)}</span>, 
                  Cardiologist - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiologist)}</span>
                </span>
              )}
            </Typography>
          </Box>

          {/* DVT History */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              DVT history: <span style={{ fontWeight: 'normal' }}>{formData.dvtHistory === 'yes' ? 'Yes' : formData.dvtHistory === 'no' ? 'No' : '[not specified]'}</span>
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
              MRSA/SSI: <span style={{ fontWeight: 'normal' }}>{formData.mrsaSsi === 'yes' ? 'Yes' : formData.mrsaSsi === 'no' ? 'No' : '[not specified]'}</span>
              {formData.mrsaSsi === 'yes' && (
                <span>
                  , location - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.mrsaSsiLocation)}</span>, 
                  date - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.mrsaSsiDate)}</span>
                </span>
              )}
            </Typography>
          </Box>

          {/* Blood Thinners */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Blood thinners: <span style={{ fontWeight: 'normal' }}>{formData.bloodThinners === 'yes' ? 'Yes' : formData.bloodThinners === 'no' ? 'No' : '[not specified]'}</span>
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
              Immunosuppression: <span style={{ fontWeight: 'normal' }}>{formData.immunosuppression === 'yes' ? 'Yes' : formData.immunosuppression === 'no' ? 'No' : '[not specified]'}</span>
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
              Opioid use: <span style={{ fontWeight: 'normal' }}>{formData.opioidUse === 'yes' ? 'Yes' : formData.opioidUse === 'no' ? 'No' : '[not specified]'}</span>
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
              Tobacco use: <span style={{ fontWeight: 'normal' }}>{formData.tobaccoUse === 'yes' ? 'Yes' : formData.tobaccoUse === 'no' ? 'No' : '[not specified]'}</span>
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
        </Box>
      </Paper>

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
