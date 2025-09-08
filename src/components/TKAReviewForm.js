import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

const TKAReviewForm = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return 'not specified';
    }
    return value;
  };

  const formatKneeSide = (side) => {
    switch (side) {
      case 'right': return 'right';
      case 'left': return 'left';
      default: return 'not specified';
    }
  };

  const formatHistory = (history) => {
    switch (history) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'not specified';
    }
  };

  const formatImaging = (imaging) => {
    switch (imaging) {
      case 'none': return 'none';
      case 'x-rays': return 'X-rays';
      case 'mri': return 'MRI';
      case 'ct': return 'CT';
      default: return 'not specified';
    }
  };

  const formatSuccess = (success) => {
    switch (success) {
      case 'no': return 'no';
      case 'minimal': return 'minimal';
      case 'mild': return 'mild';
      case 'moderate': return 'moderate';
      case 'significant': return 'significant';
      default: return 'not specified';
    }
  };

  const buildNarrative = () => {
    const kneeSide = formatKneeSide(formData.kneeSide);
    const originalSurgeon = formatValue(formData.originalSurgeon);
    const originalLocation = formatValue(formData.originalLocation);
    const originalYear = formatValue(formData.originalYear);
    const complicationsHistory = formatHistory(formData.complicationsHistory);
    const complicationsDescription = formData.complicationsHistory === 'positive' ? formatValue(formData.complicationsDescription) : '';
    const additionalSurgeryHistory = formatHistory(formData.additionalSurgeryHistory);
    const additionalSurgeryDescription = formData.additionalSurgeryHistory === 'positive' ? formatValue(formData.additionalSurgeryDescription) : '';
    const previousSurgeryHistory = formatHistory(formData.previousSurgeryHistory);
    const previousSurgeryDescription = formData.previousSurgeryHistory === 'positive' ? formatValue(formData.previousSurgeryDescription) : '';
    const satisfactionResult = formatHistory(formData.satisfactionResult);
    const injurySinceTKA = formatHistory(formData.injurySinceTKA);
    const injuryDescription = formData.injurySinceTKA === 'positive' ? formatValue(formData.injuryDescription) : '';
    const primaryComplaint = formatValue(formData.primaryComplaint);
    const painLocation = formatValue(formData.painLocation);
    const painDescription = formatValue(formData.painDescription);
    const aggravatingFactors = formatValue(formData.aggravatingFactors);
    const alleviatingFactors = formatValue(formData.alleviatingFactors);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const symptomDuration = formatValue(formData.symptomDuration);
    const symptomProgression = formatValue(formData.symptomProgression);
    const worstSymptomLevel = formatValue(formData.worstSymptomLevel);
    const bestSymptomLevel = formatValue(formData.bestSymptomLevel);
    const attemptedTreatments = formatValue(formData.attemptedTreatments);
    const treatmentSuccess = formatSuccess(formData.treatmentSuccess);
    const imagingStudies = formatImaging(formData.imagingStudies);

    let narrative = `The patient presents for evaluation of their ${kneeSide} knee. They have undergone TKA performed by ${originalSurgeon} in ${originalLocation} in ${originalYear}. There is a ${complicationsHistory} history of complications during their initial surgical episode.`;
    
    if (formData.complicationsHistory === 'positive' && complicationsDescription) {
      narrative += ` The complication was ${complicationsDescription}.`;
    }
    
    narrative += ` There is a ${additionalSurgeryHistory} history of additional surgery following the TKA.`;
    
    if (formData.additionalSurgeryHistory === 'positive' && additionalSurgeryDescription) {
      narrative += ` The additional surgery was ${additionalSurgeryDescription}.`;
    }
    
    narrative += ` There is a ${previousSurgeryHistory} history of previous surgery prior to the TKA.`;
    
    if (formData.previousSurgeryHistory === 'positive' && previousSurgeryDescription) {
      narrative += ` The surgery was ${previousSurgeryDescription}.`;
    }
    
    narrative += ` They report ${satisfactionResult} satisfaction with their result. There is a ${injurySinceTKA} history of injury since the TKA.`;
    
    if (formData.injurySinceTKA === 'positive' && injuryDescription) {
      narrative += ` The injury was ${injuryDescription}.`;
    }
    
    narrative += ` Their primary complaint is ${primaryComplaint}. The pain is located at the ${painLocation} aspect of the knee. The patient's pain is described as ${painDescription}. The symptoms are aggravated by ${aggravatingFactors} and alleviated by ${alleviatingFactors}. The patient has associated symptoms consisting of ${associatedSymptoms}. The symptoms have been present for ${symptomDuration}. The patient's symptoms have been ${symptomProgression}. At worst the severity of the symptoms is rated as a ${worstSymptomLevel} out of 10. At best, they are rated as a ${bestSymptomLevel} out of 10. Thus far, the patient has attempted ${attemptedTreatments} for relief with ${treatmentSuccess} success. Previous imaging studies consist of ${imagingStudies}.`;

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

      {/* Medical History */}
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
                  , A1C <span style={{ fontWeight: 'normal' }}>{formatValue(formData.dm2A1c)}</span>, 
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
                  Cardiologist - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.cardiologist)}</span>
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
          
          {/* Blood Thinners */}
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
        </Box>
      </Paper>
    </Box>
  );
};

export default TKAReviewForm;
