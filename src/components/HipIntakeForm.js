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
import HipComplaintForm from './HipComplaintForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import HipReviewForm from './HipReviewForm';
import { generateHipReportPDF } from '../utils/hipPdfGenerator';

const steps = ['Hip Complaint', 'Medical History', 'Review & Submit'];

const schema = yup.object({
  // Hip Complaint fields
  hipSide: yup.string().required('Please select hip side').notOneOf([''], 'Please select hip side'),
  worseSide: yup.string().when('hipSide', {
    is: 'bilateral',
    then: (schema) => schema.required('Please specify which side is worse').notOneOf([''], 'Please specify which side is worse'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painLocation: yup.string().required('Pain location is required'),
  injuryHistory: yup.string().required('Please select injury history').notOneOf([''], 'Please select injury history'),
  injuryDescription: yup.string().when('injuryHistory', {
    is: 'positive',
    then: (schema) => schema.required('Injury description is required when injury history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  previousSurgeries: yup.string().required('Previous surgeries information is required'),
  symptomDuration: yup.string().required('Please select symptom duration').notOneOf([''], 'Please select symptom duration'),
  symptomProgression: yup.string().required('Please select symptom progression').notOneOf([''], 'Please select symptom progression'),
  worstPainLevel: yup.number().required('Worst pain level is required').min(0, 'Pain level must be 0 or higher').max(10, 'Pain level must be 10 or lower'),
  bestPainLevel: yup.number().required('Best pain level is required').min(0, 'Pain level must be 0 or higher').max(10, 'Pain level must be 10 or lower'),
  painDescription: yup.string().required('Pain description is required'),
  aggravatingFactors: yup.string().required('Aggravating factors are required'),
  alleviatingFactors: yup.string().required('Alleviating factors are required'),
  associatedSymptoms: yup.string().required('Associated symptoms are required'),
  attemptedTreatments: yup.string().required('Attempted treatments are required'),
  treatmentSuccess: yup.string().required('Please select treatment success level').notOneOf([''], 'Please select treatment success level'),
  lumbarSpineHistory: yup.string().required('Please select lumbar spine history').notOneOf([''], 'Please select lumbar spine history'),
  lumbarSpineDescription: yup.string().when('lumbarSpineHistory', {
    is: 'positive',
    then: (schema) => schema.required('Lumbar spine description is required when history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  imagingStudies: yup.string().required('Please select imaging studies').notOneOf([''], 'Please select imaging studies'),
  
  // Medical History fields (same as knee form)
  pcp: yup.string().required('PCP information is required'),
  dm2: yup.string().required('Please select DM2 status').notOneOf([''], 'Please select DM2 status'),
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
  cardiacHistory: yup.string().required('Please select cardiac history').notOneOf([''], 'Please select cardiac history'),
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
  dvtHistory: yup.string().required('Please select DVT history').notOneOf([''], 'Please select DVT history'),
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
  mrsaSsi: yup.string().required('Please select MRSA/SSI status').notOneOf([''], 'Please select MRSA/SSI status'),
  mrsaSsiLocation: yup.string().when('mrsaSsi', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI location is required when MRSA/SSI is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiDate: yup.string().when('mrsaSsi', {
    is: 'yes',
    then: (schema) => schema.required('MRSA/SSI date is required when MRSA/SSI is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinners: yup.string().required('Please select blood thinners status').notOneOf([''], 'Please select blood thinners status'),
  bloodThinnerMedications: yup.string().when('bloodThinners', {
    is: 'yes',
    then: (schema) => schema.required('Blood thinner medications are required when blood thinners is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppression: yup.string().required('Please select immunosuppression status').notOneOf([''], 'Please select immunosuppression status'),
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
  opioidUse: yup.string().required('Please select opioid use status').notOneOf([''], 'Please select opioid use status'),
  opioidMedications: yup.string().when('opioidUse', {
    is: 'yes',
    then: (schema) => schema.required('Opioid medications are required when opioid use is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tobaccoUse: yup.string().required('Please select tobacco use status').notOneOf([''], 'Please select tobacco use status'),
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
  referredBy: yup.string().required('Referred by information is required'),
});

export default function HipIntakeForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // Hip Complaint fields
      hipSide: '',
      worseSide: '',
      painLocation: '',
      injuryHistory: '',
      injuryDescription: '',
      previousSurgeries: '',
      symptomDuration: '',
      symptomProgression: '',
      worstPainLevel: '',
      bestPainLevel: '',
      painDescription: '',
      aggravatingFactors: '',
      alleviatingFactors: '',
      associatedSymptoms: '',
      attemptedTreatments: '',
      treatmentSuccess: '',
      lumbarSpineHistory: '',
      lumbarSpineDescription: '',
      imagingStudies: '',
      
      // Medical History fields
      pcp: '',
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
      referredBy: '',
    },
  });

  const { handleSubmit, formState: { errors }, trigger, getValues } = methods;

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    console.log('Hip form submitted:', data);
    console.log('About to generate PDF...');
    
    // Also show an alert for immediate feedback
    alert('Hip intake form submitted! PDF is being generated. Check your downloads folder or look for a new tab/window.');
    
    try {
      // Generate and open PDF
      generateHipReportPDF(data);
      console.log('PDF generation completed');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + error.message);
    }
    
    setShowSuccess(true);
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return [
          'hipSide', 'worseSide', 'painLocation', 'injuryHistory', 'injuryDescription',
          'previousSurgeries', 'symptomDuration', 'symptomProgression', 'worstPainLevel',
          'bestPainLevel', 'painDescription', 'aggravatingFactors', 'alleviatingFactors',
          'associatedSymptoms', 'attemptedTreatments', 'treatmentSuccess', 'lumbarSpineHistory',
          'lumbarSpineDescription', 'imagingStudies'
        ];
      case 1:
        return [
          'pcp', 'dm2', 'dm2A1c', 'dm2Medications', 'cardiacHistory', 'cardiacDiagnosis',
          'cardiacProcedures', 'cardiologist', 'dvtHistory', 'dvtLocation', 'dvtDate',
          'mrsaSsi', 'mrsaSsiLocation', 'mrsaSsiDate', 'bloodThinners', 'bloodThinnerMedications',
          'immunosuppression', 'immunosuppressionMedications', 'immunosuppressionDiagnosis',
          'opioidUse', 'opioidMedications', 'tobaccoUse', 'tobaccoType', 'tobaccoFrequency', 'referredBy'
        ];
      case 2:
        return [];
      default:
        return [];
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <HipComplaintForm />;
      case 1:
        return <MedicalHistoryForm />;
      case 2:
        return <HipReviewForm />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Development shortcuts */}
            {activeStep === 0 && (
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={() => setActiveStep(1)}
                sx={{ mr: 1 }}
              >
                Skip to Step 2 (Dev)
              </Button>
            )}
            {activeStep === 1 && (
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={() => setActiveStep(2)}
                sx={{ mr: 1 }}
              >
                Skip to Step 3 (Dev)
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
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Hip intake form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
