import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import ChiefComplaintForm from './ChiefComplaintForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import ReviewForm from './ReviewForm';

const steps = ['Chief Complaint', 'Medical History', 'Review & Submit'];

const schema = yup.object({
  // Chief Complaint fields removed
  kneeSide: yup.string().required('Please select knee side').notOneOf([''], 'Please select knee side'),
  // Patient name field removed
  worseSide: yup.string().when('kneeSide', {
    is: 'bilateral',
    then: (schema) => schema.required('Please specify which side is worse'),
    otherwise: (schema) => schema.notRequired(),
  }),
  painLocation: yup.string().required('Pain location is required'),
  recentInjury: yup.string().required('Recent injury history is required').notOneOf([''], 'Please select injury history'),
  previousSurgeries: yup.string().required('Previous surgeries field is required'),
  painDuration: yup.string().required('Pain duration is required').notOneOf([''], 'Please select duration'),
  painProgression: yup.string().required('Pain progression is required').notOneOf([''], 'Please select progression'),
  worstPainLevel: yup.number().min(0).max(10).required('Worst pain level is required'),
  bestPainLevel: yup.number().min(0).max(10).required('Best pain level is required'),
  painDescription: yup.string().required('Pain description is required'),
  aggravatingFactors: yup.string().required('Aggravating factors are required'),
  alleviatingFactors: yup.string().required('Alleviating factors are required'),
  associatedSymptoms: yup.string().required('Associated symptoms are required'),
  attemptedTreatments: yup.string().required('Attempted treatments are required'),
  treatmentSuccess: yup.string().required('Treatment success level is required').notOneOf([''], 'Please select success level'),
  imagingStudies: yup.string().required('Imaging studies are required').notOneOf([''], 'Please select imaging studies'),
  livingSituation: yup.string().required('Living situation is required'),
  livingDetails: yup.string().required('Living details are required'),
  ambulation: yup.string().required('Ambulation details are required'),
  occupation: yup.string().required('Occupation is required'),
  pcp: yup.string().required('PCP is required'),
  referredBy: yup.string().required('Referred by is required'),
  
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
});

export default function PatientIntakeForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // Chief complaint removed
      kneeSide: '',
      worseSide: '',
      painLocation: '',
      recentInjury: '',
      previousSurgeries: '',
      painDuration: '',
      painProgression: '',
      worstPainLevel: 0,
      bestPainLevel: 0,
      painDescription: '',
      aggravatingFactors: '',
      alleviatingFactors: '',
      associatedSymptoms: '',
      attemptedTreatments: '',
      treatmentSuccess: '',
      imagingStudies: '',
      livingSituation: '',
      livingDetails: '',
      ambulation: '',
      occupation: '',
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
      tobaccoUse: '',
      tobaccoType: '',
      tobaccoFrequency: '',
    },
  });

  const { handleSubmit, trigger } = methods;

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
    console.log('Form submitted:', data);
    setShowSuccess(true);
    // Here you would typically send the data to your backend
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return [
          // Chief complaint removed
          'kneeSide', 'worseSide', 'painLocation',
          'recentInjury', 'previousSurgeries', 'painDuration', 'painProgression',
          'worstPainLevel', 'bestPainLevel', 'painDescription', 'aggravatingFactors',
          'alleviatingFactors', 'associatedSymptoms', 'attemptedTreatments',
          'treatmentSuccess', 'imagingStudies', 'livingSituation', 'livingDetails',
          'ambulation', 'occupation', 'pcp', 'referredBy'
        ];
      case 1:
        return [
          'dm2', 'dm2A1c', 'dm2Medications', 'cardiacHistory', 'cardiacDiagnosis',
          'cardiacProcedures', 'cardiologist', 'dvtHistory', 'dvtLocation', 'dvtDate',
          'mrsaSsi', 'mrsaSsiLocation', 'mrsaSsiDate', 'bloodThinners',
          'bloodThinnerMedications', 'immunosuppression', 'immunosuppressionMedications',
          'immunosuppressionDiagnosis', 'opioidUse', 'opioidMedications',
          'tobaccoUse', 'tobaccoType', 'tobaccoFrequency'
        ];
      default:
        return [];
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <ChiefComplaintForm />;
      case 1:
        return <MedicalHistoryForm />;
      case 2:
        return <ReviewForm />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

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
            Patient intake form submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
