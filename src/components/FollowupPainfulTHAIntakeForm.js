import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import FollowupPainfulTHAComplaintForm from './FollowupPainfulTHAComplaintForm';
import MedicalHistoryPrompt from './MedicalHistoryPrompt';
import MedicalHistoryForm from './MedicalHistoryForm';
import FollowupPainfulTHAReviewForm from './FollowupPainfulTHAReviewForm';
import { generateFollowupPainfulTHAReportPDF } from '../utils/followupPainfulThaPdfGenerator';
import { generatePatientReportText, copyToClipboard } from '../utils/textGenerator';

const steps = ['Follow-up Information', 'Medical History', 'Review & Submit'];

const schema = yup.object().shape({
  // Follow-up Information
  hipSide: yup.string().required('Hip side is required'),
  knownHistory: yup.string().required('Known history is required'),
  treatmentPlan: yup.string().required('Treatment plan is required'),
  otherTreatment: yup.string().when('treatmentPlan', {
    is: 'other',
    then: (schema) => schema.required('Please specify other treatment'),
    otherwise: (schema) => schema.notRequired(),
  }),
  historyChanges: yup.string().required('History changes are required'),
  symptomsStatus: yup.string().required('Symptoms status is required'),
  hasQuestions: yup.string().required('Questions/concerns status is required'),
  questionsDetails: yup.string().when('hasQuestions', {
    is: 'yes',
    then: (schema) => schema.required('Please provide details about questions/concerns'),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  // Medical History conditional
  includeMedicalHistory: yup.string().required('Please select whether to include medical history').notOneOf([''], 'Please select option'),
  
  // Medical History fields (conditional)
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
    then: (schema) => schema.required('DM2 status is required').notOneOf([''], 'Please select DM2 status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2A1c: yup.string().when(['includeMedicalHistory', 'dm2'], {
    is: (includeMedicalHistory, dm2) => includeMedicalHistory === 'yes' && dm2 === 'yes',
    then: (schema) => schema.required('A1C is required when DM2 is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2Medications: yup.string().when(['includeMedicalHistory', 'dm2'], {
    is: (includeMedicalHistory, dm2) => includeMedicalHistory === 'yes' && dm2 === 'yes',
    then: (schema) => schema.required('DM2 medications are required when DM2 is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacHistory: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac history is required').notOneOf([''], 'Please select cardiac history'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacDiagnosis: yup.string().when(['includeMedicalHistory', 'cardiacHistory'], {
    is: (includeMedicalHistory, cardiacHistory) => includeMedicalHistory === 'yes' && cardiacHistory === 'yes',
    then: (schema) => schema.required('Cardiac diagnosis is required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacProcedures: yup.string().when(['includeMedicalHistory', 'cardiacHistory'], {
    is: (includeMedicalHistory, cardiacHistory) => includeMedicalHistory === 'yes' && cardiacHistory === 'yes',
    then: (schema) => schema.required('Cardiac procedures are required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiologist: yup.string().when(['includeMedicalHistory', 'cardiacHistory'], {
    is: (includeMedicalHistory, cardiacHistory) => includeMedicalHistory === 'yes' && cardiacHistory === 'yes',
    then: (schema) => schema.required('Cardiologist is required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtHistory: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT history is required').notOneOf([''], 'Please select DVT history'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtLocation: yup.string().when(['includeMedicalHistory', 'dvtHistory'], {
    is: (includeMedicalHistory, dvtHistory) => includeMedicalHistory === 'yes' && dvtHistory === 'yes',
    then: (schema) => schema.required('DVT location is required when DVT history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtDate: yup.string().when(['includeMedicalHistory', 'dvtHistory'], {
    is: (includeMedicalHistory, dvtHistory) => includeMedicalHistory === 'yes' && dvtHistory === 'yes',
    then: (schema) => schema.required('DVT date is required when DVT history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsi: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI history is required').notOneOf([''], 'Please select MRSA/SSI history'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiLocation: yup.string().when(['includeMedicalHistory', 'mrsaSsi'], {
    is: (includeMedicalHistory, mrsaSsi) => includeMedicalHistory === 'yes' && mrsaSsi === 'yes',
    then: (schema) => schema.required('MRSA/SSI location is required when MRSA/SSI history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiDate: yup.string().when(['includeMedicalHistory', 'mrsaSsi'], {
    is: (includeMedicalHistory, mrsaSsi) => includeMedicalHistory === 'yes' && mrsaSsi === 'yes',
    then: (schema) => schema.required('MRSA/SSI date is required when MRSA/SSI history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinners: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Blood thinners status is required').notOneOf([''], 'Please select blood thinners status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinnerMedications: yup.string().when(['includeMedicalHistory', 'bloodThinners'], {
    is: (includeMedicalHistory, bloodThinners) => includeMedicalHistory === 'yes' && bloodThinners === 'yes',
    then: (schema) => schema.required('Blood thinner medications are required when blood thinners is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppression: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression status is required').notOneOf([''], 'Please select immunosuppression status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppressionMedications: yup.string().when(['includeMedicalHistory', 'immunosuppression'], {
    is: (includeMedicalHistory, immunosuppression) => includeMedicalHistory === 'yes' && immunosuppression === 'yes',
    then: (schema) => schema.required('Immunosuppression medications are required when immunosuppression is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppressionDiagnosis: yup.string().when(['includeMedicalHistory', 'immunosuppression'], {
    is: (includeMedicalHistory, immunosuppression) => includeMedicalHistory === 'yes' && immunosuppression === 'yes',
    then: (schema) => schema.required('Immunosuppression diagnosis is required when immunosuppression is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  opioidUse: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Opioid use status is required').notOneOf([''], 'Please select opioid use status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  opioidMedications: yup.string().when(['includeMedicalHistory', 'opioidUse'], {
    is: (includeMedicalHistory, opioidUse) => includeMedicalHistory === 'yes' && opioidUse === 'yes',
    then: (schema) => schema.required('Opioid medications are required when opioid use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painManagement: yup.string().when(['includeMedicalHistory', 'opioidUse'], {
    is: (includeMedicalHistory, opioidUse) => includeMedicalHistory === 'yes' && opioidUse === 'yes',
    then: (schema) => schema.required('Pain management status is required when opioid use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painManagementProvider: yup.string().when(['includeMedicalHistory', 'opioidUse', 'painManagement'], {
    is: (includeMedicalHistory, opioidUse, painManagement) => includeMedicalHistory === 'yes' && opioidUse === 'yes' && painManagement === 'yes',
    then: (schema) => schema.required('Pain management provider is required when following with pain management'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoUse: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco use status is required').notOneOf([''], 'Please select tobacco use status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoType: yup.string().when(['includeMedicalHistory', 'tobaccoUse'], {
    is: (includeMedicalHistory, tobaccoUse) => includeMedicalHistory === 'yes' && tobaccoUse === 'yes',
    then: (schema) => schema.required('Tobacco type is required when tobacco use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoFrequency: yup.string().when(['includeMedicalHistory', 'tobaccoUse'], {
    is: (includeMedicalHistory, tobaccoUse) => includeMedicalHistory === 'yes' && tobaccoUse === 'yes',
    then: (schema) => schema.required('Tobacco frequency is required when tobacco use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  residence: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Residence is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  hasStairs: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Stairs status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  stairCount: yup.string().when(['includeMedicalHistory', 'hasStairs'], {
    is: (includeMedicalHistory, hasStairs) => includeMedicalHistory === 'yes' && hasStairs === 'yes',
    then: (schema) => schema.required('Stair count is required when has stairs is yes'),
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

export default function FollowupPainfulTHAIntakeForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hipSide: '',
      knownHistory: '',
      treatmentPlan: '',
      otherTreatment: '',
      historyChanges: '',
      symptomsStatus: '',
      hasQuestions: '',
      questionsDetails: '',
      
      // Medical History conditional
      includeMedicalHistory: '',
      
      // Medical History defaults
      preferredName: '',
      pcp: '',
      referredBy: '',
      dm2: '',
      dm2A1c: '',
      dm2Medications: '',
      cardiacHistory: '',
      cardiacDiagnosis: '',
      cardiacProcedures: '',
      cardiologist: '',
      dvtHistory: '',
      dvtLocation: '',
      dvtDate: '',
      mrsaSsi: '',
      mrsaSsiLocation: '',
      mrsaSsiDate: '',
      bloodThinners: '',
      bloodThinnerMedications: '',
      immunosuppression: '',
      immunosuppressionMedications: '',
      immunosuppressionDiagnosis: '',
      opioidUse: '',
      opioidMedications: '',
      painManagement: '',
      painManagementProvider: '',
      tobaccoUse: '',
      tobaccoType: '',
      tobaccoFrequency: '',
      residence: '',
      hasStairs: '',
      stairCount: '',
      support: '',
      ambulatoryCapacity: '',
      occupation: '',
    },
  });

  const { handleSubmit, trigger, formState: { errors }, watch, reset } = methods;
  const includeMedicalHistory = watch('includeMedicalHistory');

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return [
          'hipSide', 'knownHistory', 'treatmentPlan', 'otherTreatment',
          'historyChanges', 'symptomsStatus', 'hasQuestions', 'questionsDetails'
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

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    console.log('About to generate PDF...');

    // Also show an alert for immediate feedback
    alert('Form submitted! PDF is being generated. Check your downloads folder or look for a new tab/window.');

    try {
      // Generate and open PDF
      generateFollowupPainfulTHAReportPDF(data);
      console.log('PDF generation completed');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + error.message);
    }

    setShowSuccess(true);
    // Here you would typically send the data to your backend
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FollowupPainfulTHAComplaintForm />;
      case 1:
        return <MedicalHistoryPrompt />;
      case 2:
        return <FollowupPainfulTHAReviewForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
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
              <Button variant="contained" onClick={async () => {
                console.log('=== GENERATE REPORT BUTTON CLICKED ===');
                const formData = methods.getValues();
                console.log('Current form data:', formData);
                
                try {
                  // Generate and copy text to clipboard (bypass validation)
                  const reportText = generatePatientReportText(formData, 'followup');
                  console.log('Generated report text:', reportText);
                  console.log('Report text length:', reportText.length);
                  
                  if (!reportText || reportText.length === 0) {
                    alert('Error: No text was generated. Check console for details.');
                    return;
                  }
                  
                  const copySuccess = await copyToClipboard(reportText);
                  console.log('Copy success:', copySuccess);
                  
                  if (copySuccess) {
                    alert('Report text copied to clipboard! PDF is also being generated.');
                  } else {
                    alert('PDF is being generated, but failed to copy text to clipboard. Check console for details.');
                    // Show the text in an alert as a fallback
                    alert('Here is the report text (copy manually):\n\n' + reportText.substring(0, 500) + '...');
                  }
                  
                  // Also generate PDF
                  generateFollowupPainfulTHAReportPDF(formData);
                  console.log('PDF generation completed');
                  
                  setShowSuccess(true);
                } catch (error) {
                  console.error('Error generating report:', error);
                  alert('Error generating report: ' + error.message);
                }
              }}>
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
            Follow-up painful THA intake form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
