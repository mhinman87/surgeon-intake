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
import THAComplaintForm from './THAComplaintForm';
import MedicalHistoryPrompt from './MedicalHistoryPrompt';
import MedicalHistoryForm from './MedicalHistoryForm';
import THAReviewForm from './THAReviewForm';
import { generateTHAReportPDF } from '../utils/thaPdfGenerator';

const steps = ['THA Evaluation', 'Medical History', 'Review & Submit'];

const schema = yup.object({
  // THA Evaluation fields
  hipSide: yup.string().required('Please select hip side').notOneOf([''], 'Please select hip side'),
  originalSurgeon: yup.string().required('Original surgeon information is required'),
  originalLocation: yup.string().required('Original surgery location is required'),
  originalYear: yup.string().required('Original surgery year is required'),
  complicationsHistory: yup.string().required('Please select complications history').notOneOf([''], 'Please select complications history'),
  complicationsDescription: yup.string().when('complicationsHistory', {
    is: 'positive',
    then: (schema) => schema.required('Complications description is required when complications history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  additionalSurgeryHistory: yup.string().required('Please select additional surgery history').notOneOf([''], 'Please select additional surgery history'),
  additionalSurgeryDescription: yup.string().when('additionalSurgeryHistory', {
    is: 'positive',
    then: (schema) => schema.required('Additional surgery description is required when additional surgery history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  previousSurgeryHistory: yup.string().required('Please select previous surgery history').notOneOf([''], 'Please select previous surgery history'),
  previousSurgeryDescription: yup.string().when('previousSurgeryHistory', {
    is: 'positive',
    then: (schema) => schema.required('Previous surgery description is required when previous surgery history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  satisfactionResult: yup.string().required('Please select satisfaction with result').notOneOf([''], 'Please select satisfaction with result'),
  injurySinceTHA: yup.string().required('Please select injury history since THA').notOneOf([''], 'Please select injury history since THA'),
  injuryDescription: yup.string().when('injurySinceTHA', {
    is: 'positive',
    then: (schema) => schema.required('Injury description is required when injury history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  primaryComplaint: yup.string().required('Primary complaint is required'),
  painLocation: yup.string().required('Pain location is required'),
  painDescription: yup.string().required('Pain description is required'),
  aggravatingFactors: yup.string().required('Aggravating factors are required'),
  alleviatingFactors: yup.string().required('Alleviating factors are required'),
  associatedSymptoms: yup.string().required('Associated symptoms are required'),
  symptomDuration: yup.string().required('Please select symptom duration').notOneOf([''], 'Please select symptom duration'),
  symptomProgression: yup.string().required('Please select symptom progression').notOneOf([''], 'Please select symptom progression'),
  worstSymptomLevel: yup.number().required('Worst symptom level is required').min(0, 'Symptom level must be 0 or higher').max(10, 'Symptom level must be 10 or lower'),
  bestSymptomLevel: yup.number().required('Best symptom level is required').min(0, 'Symptom level must be 0 or higher').max(10, 'Symptom level must be 10 or lower'),
  attemptedTreatments: yup.string().required('Attempted treatments are required'),
  treatmentSuccess: yup.string().required('Please select treatment success level').notOneOf([''], 'Please select treatment success level'),
  lumbarSpineHistory: yup.string().required('Please select lumbar spine history').notOneOf([''], 'Please select lumbar spine history'),
  lumbarSpineDescription: yup.string().when('lumbarSpineHistory', {
    is: 'positive',
    then: (schema) => schema.required('Lumbar spine description is required when history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
  imagingStudies: yup.string().required('Please select imaging studies').notOneOf([''], 'Please select imaging studies'),
  
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
    then: (schema) => schema.required('PCP information is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  dm2: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Please select DM2 status').notOneOf([''], 'Please select DM2 status'),
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
    then: (schema) => schema.required('Please select cardiac history').notOneOf([''], 'Please select cardiac history'),
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
    then: (schema) => schema.required('Please select DVT history').notOneOf([''], 'Please select DVT history'),
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
    then: (schema) => schema.required('Please select MRSA/SSI status').notOneOf([''], 'Please select MRSA/SSI status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiLocation: yup.string().when(['includeMedicalHistory', 'mrsaSsi'], {
    is: (includeMedicalHistory, mrsaSsi) => includeMedicalHistory === 'yes' && mrsaSsi === 'yes',
    then: (schema) => schema.required('MRSA/SSI location is required when MRSA/SSI is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrsaSsiDate: yup.string().when(['includeMedicalHistory', 'mrsaSsi'], {
    is: (includeMedicalHistory, mrsaSsi) => includeMedicalHistory === 'yes' && mrsaSsi === 'yes',
    then: (schema) => schema.required('MRSA/SSI date is required when MRSA/SSI is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinners: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Please select blood thinners status').notOneOf([''], 'Please select blood thinners status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  bloodThinnerMedications: yup.string().when(['includeMedicalHistory', 'bloodThinners'], {
    is: (includeMedicalHistory, bloodThinners) => includeMedicalHistory === 'yes' && bloodThinners === 'yes',
    then: (schema) => schema.required('Blood thinner medications are required when blood thinners is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
  immunosuppression: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Please select immunosuppression status').notOneOf([''], 'Please select immunosuppression status'),
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
    then: (schema) => schema.required('Please select opioid use status').notOneOf([''], 'Please select opioid use status'),
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
    then: (schema) => schema.required('Please select tobacco use status').notOneOf([''], 'Please select tobacco use status'),
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
  referredBy: yup.string().when('includeMedicalHistory', {
    is: 'yes',
    then: (schema) => schema.required('Referred by information is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function THAIntakeForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // THA Evaluation fields
      hipSide: '',
      originalSurgeon: '',
      originalLocation: '',
      originalYear: '',
      complicationsHistory: '',
      complicationsDescription: '',
      additionalSurgeryHistory: '',
      additionalSurgeryDescription: '',
      previousSurgeryHistory: '',
      previousSurgeryDescription: '',
      satisfactionResult: '',
      injurySinceTHA: '',
      injuryDescription: '',
      primaryComplaint: '',
      painLocation: '',
      painDescription: '',
      aggravatingFactors: '',
      alleviatingFactors: '',
      associatedSymptoms: '',
      symptomDuration: '',
      symptomProgression: '',
      worstSymptomLevel: '',
      bestSymptomLevel: '',
      attemptedTreatments: '',
      treatmentSuccess: '',
      lumbarSpineHistory: '',
      lumbarSpineDescription: '',
      imagingStudies: '',
      
      // Medical History conditional
      includeMedicalHistory: '',
      
      // Medical History fields
      preferredName: '',
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
      referredBy: '',
    },
  });

  const { handleSubmit, formState: { errors }, trigger, getValues, watch } = methods;
  const includeMedicalHistory = watch('includeMedicalHistory');

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
    console.log('THA form submitted:', data);
    console.log('About to generate PDF...');
    
    // Also show an alert for immediate feedback
    alert('THA evaluation form submitted! PDF is being generated. Check your downloads folder or look for a new tab/window.');
    
    try {
      // Generate and open PDF
      generateTHAReportPDF(data);
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
          'hipSide', 'originalSurgeon', 'originalLocation', 'originalYear', 'complicationsHistory',
          'complicationsDescription', 'additionalSurgeryHistory', 'additionalSurgeryDescription',
          'previousSurgeryHistory', 'previousSurgeryDescription', 'satisfactionResult', 'injurySinceTHA',
          'injuryDescription', 'primaryComplaint', 'painLocation', 'painDescription', 'aggravatingFactors',
          'alleviatingFactors', 'associatedSymptoms', 'symptomDuration', 'symptomProgression',
          'worstSymptomLevel', 'bestSymptomLevel', 'attemptedTreatments', 'treatmentSuccess',
          'lumbarSpineHistory', 'lumbarSpineDescription', 'imagingStudies'
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
        return <THAComplaintForm />;
      case 1:
        return <MedicalHistoryPrompt />;
      case 2:
        return <THAReviewForm />;
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
            THA evaluation form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
