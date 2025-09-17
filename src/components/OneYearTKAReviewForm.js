import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Typography,
  Divider,
  Paper,
} from '@mui/material';

export default function OneYearTKAReviewForm() {
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

    let narrative = `presents s/p ${kneeSide} ${surgeryType} TKA on ${surgeryDate} at ${surgeryLocation} performed by ${surgeon}. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient feels as if they ${fullRecovery} made a full recovery. They ${normalActivity} resumed normal activity and work. The patient has ${symptomRelief} relief of their pre-operative symptoms. The patient is ambulating ${ambulationStatus} assistive devices.`;

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

      {/* Medical History - Conditional */}
      {formData.includeMedicalHistory === 'yes' && (
        <Paper elevation={1} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
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
                    {formData.painManagement === 'yes' && (
                      <span>
                        , following with pain management? Yes, Provider - <span style={{ fontWeight: 'normal' }}>{formatValue(formData.painManagementProvider)}</span>
                      </span>
                    )}
                    {formData.painManagement === 'no' && (
                      <span>, following with pain management? No</span>
                    )}
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
}
