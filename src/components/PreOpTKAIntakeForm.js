import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import PreOpTKAComplaintForm from './PreOpTKAComplaintForm';
import MedicalHistoryPrompt from './MedicalHistoryPrompt';
import PreOpTKAReviewForm from './PreOpTKAReviewForm';
import { generatePreOpTKAReportPDF } from '../utils/preOpTkaPdfGenerator';
import { generatePatientReportText } from '../utils/textGenerator';

// Copy to clipboard function
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

const steps = ['Chief Complaint', 'Medical History', 'Review'];

const schema = yup.object({
  // Chief Complaint fields
  kneeSide: yup.string().required('Knee side is required'),
  diagnosis: yup.string().required('Diagnosis is required'),
  historyChanges: yup.string().required('History changes are required'),
  conservativeTreatment: yup.string().required('Conservative treatment is required'),
  treatmentDuration: yup.string().required('Treatment duration is required'),
  symptomImpact: yup.string().required('Symptom impact is required'),
  hasQuestions: yup.string().required('Questions/concerns field is required'),
  questionsDetails: yup.string().when('hasQuestions', {
    is: 'yes',
    then: (schema) => schema.required('Please provide details about questions/concerns'),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  // Medical History fields
  includeMedicalHistory: yup.string().required('Medical history inclusion is required'),
  preferredName: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Preferred name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  pcp: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('PCP is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  referredBy: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Referred by is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DM2 field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2A1c: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DM2 A1c is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2Medications: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DM2 medications are required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacHistory: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac history is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacDiagnosis: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac diagnosis is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacProcedures: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac procedures are required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiologist: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiologist is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtHistory: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT history is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtLocation: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT location is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtDate: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsi: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiLocation: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI location is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiDate: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinners: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Blood thinners field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinnerMedications: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Blood thinner medications are required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppression: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppressionMedications: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression medications are required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppressionDiagnosis: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression diagnosis is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  opioidUse: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Opioid use field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  opioidMedications: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Opioid medications are required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painManagement: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Pain management field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painManagementProvider: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Pain management provider is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoUse: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco use field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoType: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco type is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoFrequency: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco frequency is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  residence: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Residence is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  hasStairs: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Stairs field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  stairCount: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Stair count is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  support: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Support is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ambulatoryCapacity: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Ambulatory capacity is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  occupation: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Occupation is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function PreOpTKAIntakeForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // Chief Complaint defaults
      kneeSide: '',
      diagnosis: '',
      historyChanges: '',
      conservativeTreatment: '',
      treatmentDuration: '',
      symptomImpact: '',
      hasQuestions: '',
      questionsDetails: '',
      
      // Medical History defaults
      includeMedicalHistory: '',
      preferredName: '',
      pcp: '',
      referredBy: '',
    },
  });

  const { handleSubmit, formState: { errors }, trigger, getValues, watch, reset } = methods;
  const includeMedicalHistory = watch('includeMedicalHistory');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // Reset form to default values
    reset();
    // Reset active step
    setActiveStep(0);
    // Navigate back to landing page
    navigate('/');
  };

  const onSubmit = async (data) => {
    console.log('Pre-Op TKA form submitted:', data);
    
    // Validate all required fields before generating PDF
    const allFields = [
      'kneeSide', 'diagnosis', 'historyChanges', 'conservativeTreatment',
      'treatmentDuration', 'symptomImpact', 'hasQuestions', 'questionsDetails',
      'includeMedicalHistory'
    ];
    
    // Add medical history fields if user chose to include them
    if (data.includeMedicalHistory === 'yes') {
      allFields.push(
        'preferredName', 'pcp', 'referredBy', 'dm2', 'dm2A1c', 'dm2Medications',
        'cardiacHistory', 'cardiacDiagnosis', 'cardiacProcedures', 'cardiologist',
        'dvtHistory', 'dvtLocation', 'dvtDate', 'mrsaSsi', 'mrsaSsiLocation',
        'mrsaSsiDate', 'bloodThinners', 'bloodThinnerMedications', 'immunosuppression',
        'immunosuppressionMedications', 'immunosuppressionDiagnosis', 'opioidUse',
        'opioidMedications', 'painManagement', 'painManagementProvider', 'tobaccoUse',
        'tobaccoType', 'tobaccoFrequency', 'residence', 'hasStairs', 'stairCount',
        'support', 'ambulatoryCapacity', 'occupation'
      );
    }
    
    const isValid = await trigger(allFields);
    
    if (!isValid) {
      alert('Please fill out all required fields before generating the report.');
      return;
    }
    
    console.log('About to generate PDF and copy text...');
    
    try {
      // Generate and copy text to clipboard
      const reportText = generatePatientReportText(data, 'preop-tka');
      const copySuccess = await copyToClipboard(reportText);
      
      if (copySuccess) {
        alert('Report text copied to clipboard! PDF is also being generated.');
      } else {
        alert('PDF is being generated, but failed to copy text to clipboard.');
      }
      
      // Generate and open PDF
      generatePreOpTKAReportPDF(data);
      console.log('PDF generation completed');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report: ' + error.message);
    }

    setShowSuccess(true);
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return [
          'kneeSide', 'diagnosis', 'historyChanges', 'conservativeTreatment',
          'treatmentDuration', 'symptomImpact', 'hasQuestions', 'questionsDetails'
        ];
      case 1:
        if (includeMedicalHistory === 'yes') {
          return [
            'includeMedicalHistory', 'preferredName', 'pcp', 'referredBy', 'dm2', 'dm2A1c', 'dm2Medications',
            'cardiacHistory', 'cardiacDiagnosis', 'cardiacProcedures', 'cardiologist',
            'dvtHistory', 'dvtLocation', 'dvtDate', 'mrsaSsi', 'mrsaSsiLocation',
            'mrsaSsiDate', 'bloodThinners', 'bloodThinnerMedications', 'immunosuppression',
            'immunosuppressionMedications', 'immunosuppressionDiagnosis', 'opioidUse',
            'opioidMedications', 'painManagement', 'painManagementProvider', 'tobaccoUse',
            'tobaccoType', 'tobaccoFrequency', 'residence', 'hasStairs', 'stairCount',
            'support', 'ambulatoryCapacity', 'occupation'
          ];
        }
        return ['includeMedicalHistory'];
      case 2:
        return [];
      default:
        return [];
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PreOpTKAComplaintForm />;
      case 1:
        return <MedicalHistoryPrompt />;
      case 2:
        return <PreOpTKAReviewForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
      }}>
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 3, // 8-point scale spacing
            '& .MuiStepLabel-root': {
              '& .MuiStepLabel-label': {
                color: '#9CA3AF', // Text secondary
                fontWeight: 500, // Body weight
                fontSize: '0.875rem',
                '&.Mui-active': {
                  color: '#06B6D4', // Accent primary
                  fontWeight: 600,
                },
                '&.Mui-completed': {
                  color: '#8B5CF6', // Accent secondary
                },
              },
            },
            '& .MuiStepConnector-line': {
              borderColor: 'rgba(255, 255, 255, 0.1)', // Hairline
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: '#06B6D4', // Accent primary
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: '#8B5CF6', // Accent secondary
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                onClick={() => setActiveStep(index)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: 1
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Back to Home Button */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            ← Back to Surgical Options
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            ← Previous
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Generate Report
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next →
              </Button>
            )}
            
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleReset}
              sx={{ ml: 'auto' }}
            >
              Reset Form
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Pre-Op TKA evaluation form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
