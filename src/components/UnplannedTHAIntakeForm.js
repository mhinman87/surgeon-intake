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
import UnplannedTHAComplaintForm from './UnplannedTHAComplaintForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import UnplannedTHAReviewForm from './UnplannedTHAReviewForm';
import { generateUnplannedTHAReportPDF } from '../utils/unplannedThaPdfGenerator';

const steps = ['Unplanned Visit Information', 'Medical History', 'Review & Submit'];

const schema = yup.object().shape({
  // Unplanned Visit Information
  hipSide: yup.string().required('Hip side is required'),
  surgeryType: yup.string().required('Surgery type is required'),
  surgeryDate: yup.string().required('Surgery date is required'),
  surgeryLocation: yup.string().required('Surgery location is required'),
  returnReason: yup.string().required('Return reason is required'),
  injuryHistory: yup.string().required('Injury history is required'),
  injuryDetails: yup.string().when('injuryHistory', {
    is: 'positive',
    then: (schema) => schema.required('Please provide injury details'),
    otherwise: (schema) => schema.notRequired(),
  }),
  attemptedRelief: yup.string().required('Attempted relief is required'),
  reliefSuccess: yup.string().required('Relief success level is required'),
  associatedSymptoms: yup.string().required('Associated symptoms are required'),
  aggravatedBy: yup.string().required('Aggravated by is required'),
  alleviatedBy: yup.string().required('Alleviated by is required'),
  painMedication: yup.string().required('Pain medication status is required'),
  ambulationStatus: yup.string().required('Ambulation status is required'),
  assistiveDevices: yup.string().when('ambulationStatus', {
    is: 'with',
    then: (schema) => schema.required('Please specify assistive devices'),
    otherwise: (schema) => schema.notRequired(),
  }),
  normalActivity: yup.string().required('Normal activity status is required'),
  hasQuestions: yup.string().required('Questions/concerns status is required'),
  questionsDetails: yup.string().when('hasQuestions', {
    is: 'yes',
    then: (schema) => schema.required('Please provide details about questions/concerns'),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  // Medical History fields
  dm2: yup.string().required('DM2 status is required').notOneOf([''], 'Please select DM2 status'),
  dm2A1c: yup.string().when('dm2', {
    is: 'yes',
    then: (schema) => schema.required('A1C is required when DM2 is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2Medications: yup.string().when('dm2', {
    is: 'yes',
    then: (schema) => schema.required('DM2 medications are required when DM2 is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacHistory: yup.string().required('Cardiac history is required').notOneOf([''], 'Please select cardiac history'),
  cardiacDiagnosis: yup.string().when('cardiacHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac diagnosis is required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiacProcedures: yup.string().when('cardiacHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiac procedures are required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiologist: yup.string().when('cardiacHistory', {
    is: 'yes',
    then: (schema) => schema.required('Cardiologist is required when cardiac history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtHistory: yup.string().required('DVT history is required').notOneOf([''], 'Please select DVT history'),
  dvtLocation: yup.string().when('dvtHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT location is required when DVT history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dvtDate: yup.string().when('dvtHistory', {
    is: 'yes',
    then: (schema) => schema.required('DVT date is required when DVT history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsi: yup.string().required('MRSA/SSI history is required').notOneOf([''], 'Please select MRSA/SSI history'),
  mrsaSsiLocation: yup.string().when('mrsaSsi', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI location is required when MRSA/SSI history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiDate: yup.string().when('mrsaSsi', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI date is required when MRSA/SSI history is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinners: yup.string().required('Blood thinners status is required').notOneOf([''], 'Please select blood thinners status'),
  bloodThinnerMedications: yup.string().when('bloodThinners', {
    is: 'yes',
    then: (schema) => schema.required('Blood thinner medications are required when blood thinners is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppression: yup.string().required('Immunosuppression status is required').notOneOf([''], 'Please select immunosuppression status'),
  immunosuppressionMedications: yup.string().when('immunosuppression', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression medications are required when immunosuppression is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppressionDiagnosis: yup.string().when('immunosuppression', {
    is: 'yes',
    then: (schema) => schema.required('Immunosuppression diagnosis is required when immunosuppression is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  opioidUse: yup.string().required('Opioid use status is required').notOneOf([''], 'Please select opioid use status'),
  opioidMedications: yup.string().when('opioidUse', {
    is: 'yes',
    then: (schema) => schema.required('Opioid medications are required when opioid use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoUse: yup.string().required('Tobacco use status is required').notOneOf([''], 'Please select tobacco use status'),
  tobaccoType: yup.string().when('tobaccoUse', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco type is required when tobacco use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoFrequency: yup.string().when('tobaccoUse', {
    is: 'yes',
    then: (schema) => schema.required('Tobacco frequency is required when tobacco use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  pcp: yup.string().required('PCP is required'),
  referredBy: yup.string().required('Referred by is required'),
});

export default function UnplannedTHAIntakeForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hipSide: '',
      surgeryType: '',
      surgeryDate: '',
      surgeryLocation: '',
      returnReason: '',
      injuryHistory: '',
      injuryDetails: '',
      attemptedRelief: '',
      reliefSuccess: '',
      associatedSymptoms: '',
      aggravatedBy: '',
      alleviatedBy: '',
      painMedication: '',
      ambulationStatus: '',
      assistiveDevices: '',
      normalActivity: '',
      hasQuestions: '',
      questionsDetails: '',
      
      // Medical History defaults
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
      tobaccoUse: '',
      tobaccoType: '',
      tobaccoFrequency: '',
      pcp: '',
      referredBy: '',
    },
  });

  const { handleSubmit, trigger, formState: { errors } } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    console.log('About to generate PDF...');

    // Also show an alert for immediate feedback
    alert('Form submitted! PDF is being generated. Check your downloads folder or look for a new tab/window.');

    try {
      // Generate and open PDF
      generateUnplannedTHAReportPDF(data);
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
        return <UnplannedTHAComplaintForm />;
      case 1:
        return <MedicalHistoryForm />;
      case 2:
        return <UnplannedTHAReviewForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          {/* Development shortcuts */}
          {activeStep === 0 && (
            <Button
              variant="outlined"
              onClick={() => setActiveStep(2)}
              sx={{ mr: 1 }}
            >
              Skip to Review (Dev)
            </Button>
          )}

          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Unplanned THA intake form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
