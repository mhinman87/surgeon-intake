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
import ChiefComplaintForm from './ChiefComplaintForm';
import MedicalHistoryPrompt from './MedicalHistoryPrompt';
import MedicalHistoryForm from './MedicalHistoryForm';
import ReviewForm from './ReviewForm';
import { generatePatientReportPDF } from '../utils/pdfGenerator';
import { generatePatientReportText, copyToClipboard } from '../utils/textGenerator';

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
  injuryDescription: yup.string().when('recentInjury', {
    is: 'positive',
    then: (schema) => schema.required('Injury description is required when injury history is positive'),
    otherwise: (schema) => schema.notRequired(),
  }),
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
    then: (schema) => schema.required('Stairs status is required').notOneOf([''], 'Please select stairs status'),
    otherwise: (schema) => schema.notRequired(),
  }),
  stairCount: yup.string().when(['includeMedicalHistory', 'hasStairs'], {
    is: (includeMedicalHistory, hasStairs) => includeMedicalHistory === 'yes' && hasStairs === 'yes',
    then: (schema) => schema.required('Stair count is required when stairs are present'),
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
});

export default function PatientIntakeForm() {
  const navigate = useNavigate();
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
      injuryDescription: '',
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
    },
  });

  const { handleSubmit, trigger, watch, reset } = methods;
  const includeMedicalHistory = watch('includeMedicalHistory');
  
  // Debug logging
  console.log('Current activeStep:', activeStep);
  console.log('includeMedicalHistory value:', includeMedicalHistory);

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
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form submitted:', data);
    console.log('Form validation passed, proceeding with submission...');
    
    // Validate all required fields before generating PDF
    const allFields = [
      'kneeSide', 'worseSide', 'painLocation', 'recentInjury', 'injuryDescription', 
      'previousSurgeries', 'painDuration', 'painProgression', 'worstPainLevel', 
      'bestPainLevel', 'painDescription', 'aggravatingFactors', 'alleviatingFactors', 
      'associatedSymptoms', 'attemptedTreatments', 'treatmentSuccess', 'imagingStudies', 
      'livingSituation', 'livingDetails', 'ambulation', 'occupation', 'includeMedicalHistory'
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
        'support', 'ambulatoryCapacity'
      );
    }
    
    const isValid = await trigger(allFields);
    
    if (!isValid) {
      alert('Please fill out all required fields before generating the report.');
      return;
    }
    
    console.log('About to generate PDF and copy text...');
    console.log('Form data:', data);
    
    try {
      // Generate and copy text to clipboard
      const reportText = generatePatientReportText(data, 'knee');
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
      }
      
      // Generate and open PDF
      generatePatientReportPDF(data);
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
          'kneeSide', 'worseSide', 'painLocation',
          'recentInjury', 'injuryDescription', 'previousSurgeries', 'painDuration', 'painProgression',
          'worstPainLevel', 'bestPainLevel', 'painDescription', 'aggravatingFactors',
          'alleviatingFactors', 'associatedSymptoms', 'attemptedTreatments',
          'treatmentSuccess', 'imagingStudies', 'livingSituation', 'livingDetails',
          'ambulation', 'occupation'
        ];
      case 1:
        // Validate includeMedicalHistory and all medical history fields if user chose yes
        if (includeMedicalHistory === 'yes') {
          return [
            'includeMedicalHistory', 'preferredName', 'pcp', 'referredBy', 'dm2', 'dm2A1c', 'dm2Medications', 
            'cardiacHistory', 'cardiacDiagnosis', 'cardiacProcedures', 'cardiologist', 
            'dvtHistory', 'dvtLocation', 'dvtDate', 'mrsaSsi', 'mrsaSsiLocation', 
            'mrsaSsiDate', 'bloodThinners', 'bloodThinnerMedications', 'immunosuppression', 
            'immunosuppressionMedications', 'immunosuppressionDiagnosis', 'opioidUse', 
            'opioidMedications', 'painManagement', 'painManagementProvider', 'tobaccoUse', 
            'tobaccoType', 'tobaccoFrequency', 'residence', 'hasStairs', 'stairCount', 
            'support', 'ambulatoryCapacity'
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
    console.log('renderStepContent called with step:', step);
    console.log('includeMedicalHistory in renderStepContent:', includeMedicalHistory);
    
    switch (step) {
      case 0:
        return <ChiefComplaintForm />;
      case 1:
        return <MedicalHistoryPrompt />;
      case 2:
        // Always show review form on step 2
        console.log('Step 2: Showing ReviewForm');
        return <ReviewForm />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ 
        width: '100%',
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
                  borderRadius: '8px', // Corner radius
                  p: 1,
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
                    border: '1px solid rgba(255, 255, 255, 0.06)', // Hairline
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
            sx={{ 
              mb: 2,
              borderRadius: '8px', // Corner radius
              border: '1px solid rgba(255, 255, 255, 0.1)', // Hairline
              color: '#FFFFFF', // Text primary
              backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
              backdropFilter: 'blur(20px)',
              fontWeight: 500, // Body weight
              fontSize: '0.875rem',
              py: 1,
              px: 2,
              transition: 'all 0.2s ease-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
              },
            }}
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
            sx={{ 
              mr: 1,
              borderRadius: '8px', // Corner radius
              border: '1px solid rgba(255, 255, 255, 0.1)', // Hairline
              color: '#FFFFFF', // Text primary
              backgroundColor: 'rgba(255, 255, 255, 0.02)', // Glass tint
              backdropFilter: 'blur(20px)',
              fontWeight: 500, // Body weight
              fontSize: '0.875rem',
              py: 1,
              px: 2,
              transition: 'all 0.2s ease-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                color: '#6B7280',
                borderColor: 'rgba(255, 255, 255, 0.06)',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
              },
            }}
          >
            ← Previous
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <Button 
                variant="contained" 
                onClick={async () => {
                  console.log('=== GENERATE REPORT BUTTON CLICKED ===');
                  const formData = methods.getValues();
                  console.log('Current form data:', formData);
                  
                  try {
                    // Generate and copy text to clipboard (bypass validation)
                    const reportText = generatePatientReportText(formData, 'knee');
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
                      
                      // Also try a simple test
                      try {
                        const testSuccess = await copyToClipboard('TEST CLIPBOARD');
                        alert('Simple clipboard test: ' + (testSuccess ? 'SUCCESS' : 'FAILED'));
                      } catch (e) {
                        alert('Simple clipboard test: ERROR - ' + e.message);
                      }
                    }
                    
                    // Also generate PDF
                    generatePatientReportPDF(formData);
                    console.log('PDF generation completed');
                    
                    setShowSuccess(true);
                  } catch (error) {
                    console.error('Error generating report:', error);
                    alert('Error generating report: ' + error.message);
                  }
                }}
                sx={{
                  borderRadius: '8px', // Corner radius
                  background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)', // Accent primary
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 1,
                  px: 3,
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.2)', // Accent glow
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5B5CF6 0%, #7C3AED 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 0 16px rgba(99, 102, 241, 0.3)', // Accent glow intensity
                  },
                }}
              >
                Generate Report
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={handleNext}
                sx={{
                  borderRadius: '8px', // Corner radius
                  background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)', // Accent primary
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 1,
                  px: 3,
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.2)', // Accent glow
                  transition: 'all 0.2s ease-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5B5CF6 0%, #7C3AED 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 0 16px rgba(99, 102, 241, 0.3)', // Accent glow intensity
                  },
                }}
              >
                Next →
              </Button>
            )}
            
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleReset}
              sx={{ 
                ml: 'auto',
                borderRadius: '8px', // Corner radius
                border: '1px solid rgba(239, 68, 68, 0.3)', // Error hairline
                color: '#EF4444', // Error color
                backgroundColor: 'rgba(239, 68, 68, 0.05)', // Error glass tint
                backdropFilter: 'blur(20px)',
                fontWeight: 500, // Body weight
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                transition: 'all 0.2s ease-out',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Reset Form
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: 'rgba(34, 197, 94, 0.1)', // Success glass tint
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 197, 94, 0.2)', // Success hairline
              borderRadius: '12px', // Corner radius
              color: '#FFFFFF', // Text primary
            },
          }}
        >
          <Alert 
            onClose={() => setShowSuccess(false)} 
            severity="success"
            sx={{
              backgroundColor: 'transparent',
              color: '#FFFFFF', // Text primary
              '& .MuiAlert-icon': {
                color: '#22C55E', // Success color
              },
              '& .MuiAlert-action': {
                color: '#FFFFFF', // Text primary
              },
            }}
          >
            Patient intake form submitted successfully! PDF report generated.
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
