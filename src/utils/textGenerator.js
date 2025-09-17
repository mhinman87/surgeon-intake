// Utility functions for generating text content from form data

export const generatePatientReportText = (formData, formType = 'knee') => {
  // Helper function to format values
  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return '[not specified]';
    }
    return value;
  };

  // Helper function to format dropdown values to lowercase when not at beginning of sentence
  const formatDropdownValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return '[not specified]';
    }
    // Convert to lowercase for dropdown values that are typically capitalized in UI
    const lowercaseValue = value.toLowerCase();
    return lowercaseValue;
  };

  const formatKneeSide = (side) => {
    return formatDropdownValue(side);
  };

  const formatHipSide = (side) => {
    return formatDropdownValue(side);
  };

  const formatInjuryHistory = (injury) => {
    return formatDropdownValue(injury);
  };

  const formatImaging = (imaging) => {
    return formatDropdownValue(imaging);
  };

  const formatSuccess = (success) => {
    return formatDropdownValue(success);
  };

  // Build the narrative paragraph based on form type
  const buildNarrative = () => {
    // Auto-detect form type based on available fields
    let detectedFormType = formType;
    if (formData.kneeSide && !formData.hipSide) detectedFormType = 'knee';
    if (formData.hipSide && !formData.kneeSide) detectedFormType = 'hip';
    if (formData.surgeryType) detectedFormType = 'postop';
    if (formData.treatmentPlan) detectedFormType = 'followup';
    if (formData.fullRecoveryStatus) detectedFormType = 'oneyear';
    if (formData.injuryHistory && formData.reliefSuccessLevel) detectedFormType = 'unplanned';
    if (formData.diagnosis && formData.conservativeTreatment) {
      if (formData.kneeSide) detectedFormType = 'preop-tka';
      if (formData.hipSide) detectedFormType = 'preop-tha';
    }

    switch (detectedFormType) {
      case 'knee':
        return buildKneeNarrative();
      case 'hip':
        return buildHipNarrative();
      case 'postop':
        return buildPostopNarrative();
      case 'followup':
        return buildFollowupNarrative();
      case 'oneyear':
        return buildOneYearNarrative();
      case 'unplanned':
        return buildUnplannedNarrative();
      case 'preop-tka':
        return buildPreOpTKANarrative();
      case 'preop-tha':
        return buildPreOpTHANarrative();
      default:
        return buildKneeNarrative();
    }
  };

  const buildKneeNarrative = () => {
    const kneeSide = formatKneeSide(formData.kneeSide);
    const worseSide = formData.kneeSide === 'bilateral' ? formatDropdownValue(formData.worseSide) : '';
    const painLocation = formatValue(formData.painLocation);
    const recentInjury = formatInjuryHistory(formData.recentInjury);
    const injuryDescription = formatValue(formData.injuryDescription);
    const previousSurgeries = formatValue(formData.previousSurgeries);
    const painDuration = formatDropdownValue(formData.painDuration);
    const painProgression = formatDropdownValue(formData.painProgression);
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
    
    if (recentInjury === 'positive' && injuryDescription && injuryDescription !== '[not specified]') {
      narrative += ` The injury was described as: ${injuryDescription}.`;
    }
    
    narrative += ` Previous surgeries include: ${previousSurgeries}. The pain has been present for ${painDuration} and has been ${painProgression}.`;
    
    narrative += ` Pain levels range from ${bestPain}/10 (best) to ${worstPain}/10 (worst). The pain is described as ${painDescription}.`;
    
    narrative += ` Aggravating factors include: ${aggravatingFactors}. Alleviating factors include: ${alleviatingFactors}.`;
    
    if (associatedSymptoms && associatedSymptoms !== '[not specified]') {
      narrative += ` Associated symptoms include: ${associatedSymptoms}.`;
    }
    
    narrative += ` Previous treatments attempted include: ${attemptedTreatments}. The success of these treatments has been ${treatmentSuccess}.`;
    
    narrative += ` Imaging studies performed include: ${imagingStudies}.`;
    
    return narrative;
  };

  const buildHipNarrative = () => {
    const hipSide = formatHipSide(formData.hipSide);
    const worseSide = formData.hipSide === 'bilateral' ? formatDropdownValue(formData.worseSide) : '';
    const painLocation = formatValue(formData.painLocation);
    const injuryHistory = formatInjuryHistory(formData.injuryHistory);
    const injuryDescription = formatValue(formData.injuryDescription);
    const previousSurgeries = formatValue(formData.previousSurgeries);
    const symptomDuration = formatDropdownValue(formData.symptomDuration);
    const symptomProgression = formatDropdownValue(formData.symptomProgression);
    const worstPain = formatValue(formData.worstPainLevel);
    const bestPain = formatValue(formData.bestPainLevel);
    const painDescription = formatValue(formData.painDescription);
    const aggravatingFactors = formatValue(formData.aggravatingFactors);
    const alleviatingFactors = formatValue(formData.alleviatingFactors);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const attemptedTreatments = formatValue(formData.attemptedTreatments);
    const treatmentSuccess = formatSuccess(formData.treatmentSuccess);
    const lumbarSpineHistory = formatInjuryHistory(formData.lumbarSpineHistory);
    const lumbarSpineDescription = formatValue(formData.lumbarSpineDescription);
    const imagingStudies = formatImaging(formData.imagingStudies);

    let narrative = `presents for ${hipSide} hip pain.`;
    
    if (formData.hipSide === 'bilateral' && worseSide && worseSide !== '[not specified]') {
      if (worseSide === 'equally') {
        narrative += ` Right and left are equally painful.`;
      } else {
        narrative += ` The ${worseSide} is worse.`;
      }
    }
    
    narrative += ` The pain is located at the ${painLocation} aspect of the hip(s). There is a ${injuryHistory} history of injury.`;
    
    if (injuryHistory === 'positive' && injuryDescription && injuryDescription !== '[not specified]') {
      narrative += ` The injury was described as: ${injuryDescription}.`;
    }
    
    narrative += ` Previous surgeries include: ${previousSurgeries}. The symptoms have been present for ${symptomDuration} and have been ${symptomProgression}.`;
    
    narrative += ` Pain levels range from ${bestPain}/10 (best) to ${worstPain}/10 (worst). The pain is described as ${painDescription}.`;
    
    narrative += ` Aggravating factors include: ${aggravatingFactors}. Alleviating factors include: ${alleviatingFactors}.`;
    
    if (associatedSymptoms && associatedSymptoms !== '[not specified]') {
      narrative += ` Associated symptoms include: ${associatedSymptoms}.`;
    }
    
    narrative += ` Previous treatments attempted include: ${attemptedTreatments}. The success of these treatments has been ${treatmentSuccess}.`;
    
    if (lumbarSpineHistory === 'positive' && lumbarSpineDescription && lumbarSpineDescription !== '[not specified]') {
      narrative += ` There is a positive lumbar spine history: ${lumbarSpineDescription}.`;
    }
    
    narrative += ` Imaging studies performed include: ${imagingStudies}.`;
    
    return narrative;
  };

  const buildPostopNarrative = () => {
    const side = formatValue(formData.kneeSide || formData.hipSide);
    const surgeryType = formatValue(formData.surgeryType);
    const surgeryDate = formatValue(formData.surgeryDate);
    const surgeryLocation = formatValue(formData.surgeryLocation);
    const historyChanges = formatValue(formData.historyChanges);
    const progressLevel = formatValue(formData.progressLevel);
    const recoveryPercentage = formatValue(formData.recoveryPercentage);
    const therapyWeeks = formatValue(formData.therapyWeeks);
    const therapyLocation = formatValue(formData.therapyLocation);
    const therapyVisitsPerWeek = formatValue(formData.therapyVisitsPerWeek);
    const therapyDischarged = formatValue(formData.therapyDischarged);
    const ambulationStatus = formatValue(formData.ambulationStatus);
    const assistiveDevices = formatValue(formData.assistiveDevices);
    const painMedication = formatValue(formData.painMedication);
    const symptomRelief = formatValue(formData.symptomRelief);
    const satisfaction = formatValue(formData.satisfaction);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);
    const kneeExtension = formatValue(formData.kneeExtension);
    const kneeFlexion = formatValue(formData.kneeFlexion);

    let narrative = `presents s/p ${surgeryType} of the ${side} ${formData.kneeSide ? 'knee' : 'hip'} on ${surgeryDate} at ${surgeryLocation}.`;
    
    narrative += ` History changes: ${historyChanges}. Progress level: ${progressLevel}. Recovery percentage: ${recoveryPercentage}%.`;
    
    narrative += ` Therapy: ${therapyWeeks} weeks at ${therapyLocation}, ${therapyVisitsPerWeek} visits per week. Therapy discharge status: ${therapyDischarged}.`;
    
    narrative += ` Ambulation status: ${ambulationStatus}.`;
    
    if (ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` Using assistive devices: ${assistiveDevices}.`;
    }
    
    narrative += ` Pain medication: ${painMedication}. Symptom relief level: ${symptomRelief}. Satisfaction status: ${satisfaction}.`;
    
    if (formData.kneeSide && kneeExtension && kneeFlexion) {
      narrative += ` ROM: Extension ${kneeExtension}°, Flexion ${kneeFlexion}°.`;
    }
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` No questions or concerns.`;
    }
    
    return narrative;
  };

  const buildFollowupNarrative = () => {
    const side = formatValue(formData.kneeSide || formData.hipSide);
    const clinicHistory = formatValue(formData.clinicHistory);
    const treatmentPlan = formatValue(formData.treatmentPlan);
    const treatmentPlanOther = formatValue(formData.treatmentPlanOther);
    const symptomsStatus = formatValue(formData.symptomsStatus);
    const historyChanges = formatValue(formData.historyChanges);
    const treatmentConsideration = formatValue(formData.treatmentConsideration);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents for follow-up of ${side} ${formData.kneeSide ? 'knee' : 'hip'}.`;
    
    narrative += ` Clinic history: ${clinicHistory}. Treatment plan: ${treatmentPlan}.`;
    
    if (treatmentPlan === 'other' && treatmentPlanOther && treatmentPlanOther !== '[not specified]') {
      narrative += ` Other treatment plan details: ${treatmentPlanOther}.`;
    }
    
    narrative += ` Symptoms status: ${symptomsStatus}. History changes: ${historyChanges}.`;
    narrative += ` Treatment consideration: ${treatmentConsideration}.`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` No questions or concerns.`;
    }
    
    return narrative;
  };

  const buildOneYearNarrative = () => {
    const side = formatValue(formData.kneeSide || formData.hipSide);
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

    let narrative = `presents s/p ${surgeryType} of the ${side} ${formData.kneeSide ? 'knee' : 'hip'} on ${surgeryDate} at ${surgeryLocation} by ${surgeon}.`;
    
    narrative += ` History changes: ${historyChanges}. Full recovery status: ${fullRecovery}. Normal activity status: ${normalActivity}.`;
    
    narrative += ` Symptom relief level: ${symptomRelief}. Ambulation status: ${ambulationStatus}.`;
    
    if (ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` Using assistive devices: ${assistiveDevices}.`;
    }
    
    narrative += ` Pain medication: ${painMedication}. Satisfaction status: ${satisfaction}.`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` No questions or concerns.`;
    }
    
    return narrative;
  };

  const buildUnplannedNarrative = () => {
    const side = formatValue(formData.kneeSide || formData.hipSide);
    const surgeryType = formatValue(formData.surgeryType);
    const surgeryDate = formatValue(formData.surgeryDate);
    const surgeryLocation = formatValue(formData.surgeryLocation);
    const returnReason = formatValue(formData.returnReason);
    const injuryHistory = formatInjuryHistory(formData.injuryHistory);
    const injuryDetails = formatValue(formData.injuryDetails);
    const attemptedRelief = formatValue(formData.attemptedRelief);
    const reliefSuccess = formatValue(formData.reliefSuccess);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const aggravatedBy = formatValue(formData.aggravatedBy);
    const alleviatedBy = formatValue(formData.alleviatedBy);
    const painMedication = formatValue(formData.painMedication);
    const ambulationStatus = formatValue(formData.ambulationStatus);
    const assistiveDevices = formatValue(formData.assistiveDevices);
    const normalActivity = formatValue(formData.normalActivity);
    const hasQuestions = formatValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents s/p ${surgeryType} of the ${side} ${formData.kneeSide ? 'knee' : 'hip'} on ${surgeryDate} at ${surgeryLocation}.`;
    
    narrative += ` Return reason: ${returnReason}. There is a ${injuryHistory} history of injury.`;
    
    if (injuryHistory === 'positive' && injuryDetails && injuryDetails !== '[not specified]') {
      narrative += ` Injury details: ${injuryDetails}.`;
    }
    
    narrative += ` Attempted relief: ${attemptedRelief}. Relief success level: ${reliefSuccess}.`;
    narrative += ` Associated symptoms: ${associatedSymptoms}. Aggravated by: ${aggravatedBy}. Alleviated by: ${alleviatedBy}.`;
    
    narrative += ` Pain medication: ${painMedication}. Ambulation status: ${ambulationStatus}.`;
    
    if (ambulationStatus === 'with' && assistiveDevices && assistiveDevices !== '[not specified]') {
      narrative += ` Using assistive devices: ${assistiveDevices}.`;
    }
    
    narrative += ` Normal activity status: ${normalActivity}.`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` No questions or concerns.`;
    }
    
    return narrative;
  };

  const buildPreOpTKANarrative = () => {
    const kneeSide = formatKneeSide(formData.kneeSide);
    const diagnosis = formatValue(formData.diagnosis);
    const historyChanges = formatValue(formData.historyChanges);
    const conservativeTreatment = formatValue(formData.conservativeTreatment);
    const treatmentDuration = formatDropdownValue(formData.treatmentDuration);
    const symptomImpact = formatValue(formData.symptomImpact);
    const hasQuestions = formatDropdownValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents today for a follow up of their ${kneeSide} knee ${diagnosis}. Since last seen they have experienced exacerbation of their symptoms and further degradation of quality of life. Orthopedic/medical history changes since last seen consist of ${historyChanges}. At last visit, treatment options were discussed. The patient elected to consider arthroplasty. They were sent for further workup to assist in determining their medical fitness for joint replacement. The patient has otherwise attempted multiple forms of conservative treatment including ${conservativeTreatment} despite prolonged conservative treatment course of ${treatmentDuration}. The patient has failed to achieve long lasting relief. They consider their symptoms to be significant and degrading to their quality of life and ability to participate in employment and self-care. ${symptomImpact}`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` Questions/concerns: none.`;
    }
    
    return narrative;
  };

  const buildPreOpTHANarrative = () => {
    const hipSide = formatHipSide(formData.hipSide);
    const diagnosis = formatValue(formData.diagnosis);
    const historyChanges = formatValue(formData.historyChanges);
    const hasQuestions = formatDropdownValue(formData.hasQuestions);
    const questionsDetails = formatValue(formData.questionsDetails);

    let narrative = `presents today for a follow up of their ${hipSide} hip ${diagnosis}. Since last seen they have experienced exacerbation of their symptoms and further degradation of quality of life. Orthopedic/medical history changes since last seen consist of ${historyChanges}. At last visit, treatment options were discussed. The patient elected to consider arthroplasty. They were sent for further workup to assist in determining their medical fitness for joint replacement. The patient has otherwise attempted multiple forms of conservative treatment including activity modification, home directed stretching and strengthening, physical therapy, scheduled NSAIDS, Tylenol, cold therapy, and weight loss despite prolonged conservative treatment course of greater than 3 months. The patient has failed to achieve long lasting relief. They consider their symptoms to be significant and degrading to their quality of life and ability to participate in employment and self-care.`;
    
    if (hasQuestions === 'yes' && questionsDetails && questionsDetails !== '[not specified]') {
      narrative += ` Questions/concerns: ${questionsDetails}.`;
    } else if (hasQuestions === 'no') {
      narrative += ` Questions/concerns: none.`;
    }
    
    return narrative;
  };

  // Build medical history text
  const buildMedicalHistoryText = () => {
    if (formData.includeMedicalHistory !== 'yes') {
      return '';
    }

    let medicalHistory = '\n\nMEDICAL HISTORY:\n';
    
    // PCP
    medicalHistory += `PCP: ${formatValue(formData.pcp)}\n`;
    
    // DM2
    medicalHistory += `DM2: ${formData.dm2 === 'yes' ? 'Yes' : formData.dm2 === 'no' ? 'No' : '[not specified]'}`;
    if (formData.dm2 === 'yes') {
      medicalHistory += `, A1C ${formatValue(formData.dm2A1c)}, medications - ${formatValue(formData.dm2Medications)}`;
    }
    medicalHistory += '\n';
    
    // Cardiac History
    medicalHistory += `Cardiac history: ${formData.cardiacHistory === 'yes' ? 'Yes' : formData.cardiacHistory === 'no' ? 'No' : '[not specified]'}`;
    if (formData.cardiacHistory === 'yes') {
      medicalHistory += `, diagnosis - ${formatValue(formData.cardiacDiagnosis)}, procedures - ${formatValue(formData.cardiacProcedures)}, Cardiologist - ${formatValue(formData.cardiologist)}`;
    }
    medicalHistory += '\n';
    
    // DVT History
    medicalHistory += `DVT history: ${formData.dvtHistory === 'yes' ? 'Yes' : formData.dvtHistory === 'no' ? 'No' : '[not specified]'}`;
    if (formData.dvtHistory === 'yes') {
      medicalHistory += `, location - ${formatValue(formData.dvtLocation)}, date - ${formatValue(formData.dvtDate)}`;
    }
    medicalHistory += '\n';
    
    // MRSA/SSI
    medicalHistory += `MRSA/SSI: ${formData.mrsaSsi === 'yes' ? 'Yes' : formData.mrsaSsi === 'no' ? 'No' : '[not specified]'}`;
    if (formData.mrsaSsi === 'yes') {
      medicalHistory += `, location - ${formatValue(formData.mrsaSsiLocation)}, date - ${formatValue(formData.mrsaSsiDate)}`;
    }
    medicalHistory += '\n';
    
    // Blood Thinners
    medicalHistory += `Blood thinners: ${formData.bloodThinners === 'yes' ? 'Yes' : formData.bloodThinners === 'no' ? 'No' : '[not specified]'}`;
    if (formData.bloodThinners === 'yes') {
      medicalHistory += `, medications - ${formatValue(formData.bloodThinnerMedications)}`;
    }
    medicalHistory += '\n';
    
    // Immunosuppression
    medicalHistory += `Immunosuppression: ${formData.immunosuppression === 'yes' ? 'Yes' : formData.immunosuppression === 'no' ? 'No' : '[not specified]'}`;
    if (formData.immunosuppression === 'yes') {
      medicalHistory += `, medications - ${formatValue(formData.immunosuppressionMedications)}, diagnosis - ${formatValue(formData.immunosuppressionDiagnosis)}`;
    }
    medicalHistory += '\n';
    
    // Opioid Use
    medicalHistory += `Opioid use: ${formData.opioidUse === 'yes' ? 'Yes' : formData.opioidUse === 'no' ? 'No' : '[not specified]'}`;
    if (formData.opioidUse === 'yes') {
      medicalHistory += `, medications - ${formatValue(formData.opioidMedications)}`;
      if (formData.painManagement === 'yes') {
        medicalHistory += `, following with pain management - Yes, Provider - ${formatValue(formData.painManagementProvider)}`;
      } else {
        medicalHistory += `, following with pain management - No`;
      }
    }
    medicalHistory += '\n';
    
    // Tobacco Use
    medicalHistory += `Tobacco use: ${formData.tobaccoUse === 'yes' ? 'Yes' : formData.tobaccoUse === 'no' ? 'No' : '[not specified]'}`;
    if (formData.tobaccoUse === 'yes') {
      medicalHistory += `, type - ${formatValue(formData.tobaccoType)}, frequency - ${formatValue(formData.tobaccoFrequency)}`;
    }
    medicalHistory += '\n';
    
    // Referred By
    medicalHistory += `Referred by: ${formatValue(formData.referredBy)}\n`;
    
    // Additional fields
    medicalHistory += `Residence: ${formatValue(formData.residence)}\n`;
    medicalHistory += `Stairs: ${formData.hasStairs === 'yes' ? 'Yes' : formData.hasStairs === 'no' ? 'No' : '[not specified]'}`;
    if (formData.hasStairs === 'yes') {
      medicalHistory += `, count - ${formatValue(formData.stairCount)}`;
    }
    medicalHistory += '\n';
    medicalHistory += `Support: ${formatValue(formData.support)}\n`;
    medicalHistory += `Ambulatory capacity: ${formatValue(formData.ambulatoryCapacity)}\n`;
    
    return medicalHistory;
  };

  // Combine all text
  const narrativeText = buildNarrative();
  console.log('Generated narrative text:', narrativeText);
  console.log('Narrative text length:', narrativeText.length);
  
  let fullText = `PATIENT SUMMARY:\n\n${narrativeText}`;
  
  const medicalHistoryText = buildMedicalHistoryText();
  console.log('Generated medical history text:', medicalHistoryText);
  console.log('Medical history text length:', medicalHistoryText ? medicalHistoryText.length : 0);
  
  if (medicalHistoryText) {
    fullText += `\n\nMEDICAL HISTORY:\n${medicalHistoryText}`;
  }
  
  console.log('Final full text length:', fullText.length);
  console.log('Final full text preview (first 200 chars):', fullText.substring(0, 200));
  
  return fullText;
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  console.log('=== CLIPBOARD COPY STARTED ===');
  console.log('Attempting to copy text, length:', text.length);
  console.log('Text preview (first 300 chars):', text.substring(0, 300));
  console.log('Text preview (last 300 chars):', text.substring(Math.max(0, text.length - 300)));
  
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      console.log('Trying modern clipboard API...');
      await navigator.clipboard.writeText(text);
      console.log('Modern clipboard API successful');
      return true;
    } catch (err) {
      console.error('Modern clipboard API failed:', err);
    }
  }
  
  // Fallback to legacy method
  try {
    console.log('Trying legacy clipboard method...');
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Try different selection methods
    if (document.selection) {
      const range = document.body.createTextRange();
      range.moveToElementText(textArea);
      range.select();
    }
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    console.log('Legacy copy successful:', successful);
    return successful;
  } catch (fallbackErr) {
    console.error('Legacy copy failed:', fallbackErr);
    return false;
  }
};
