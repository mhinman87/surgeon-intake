import jsPDF from 'jspdf';
import { generatePatientReportText } from './textGenerator';

export const generateHipReportPDF = (formData) => {
  console.log('Hip PDF Generator called with data:', formData);
  const doc = new jsPDF();
  
  // Helper function to format values
  const formatValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return 'not specified';
    }
    return value;
  };

  const formatHipSide = (side) => {
    switch (side) {
      case 'right': return 'right';
      case 'left': return 'left';
      case 'bilateral': return 'bilateral';
      default: return 'not specified';
    }
  };

  const formatInjuryHistory = (injury) => {
    switch (injury) {
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

  // Use centralized text generator
  const fullReportText = generatePatientReportText(formData, 'hip');
  const lines = fullReportText.split('\n');
  
  // Extract just the narrative part (skip "PATIENT SUMMARY:" header)
  const narrativeStartIndex = lines.findIndex(line => line.trim() === 'PATIENT SUMMARY:') + 2;
  const narrativeEndIndex = lines.findIndex(line => line.trim() === 'MEDICAL HISTORY:');
  const narrativeLines = narrativeEndIndex > -1 ? 
    lines.slice(narrativeStartIndex, narrativeEndIndex) : 
    lines.slice(narrativeStartIndex);
  
  const narrative = narrativeLines.join(' ').trim();
  
  // Build the narrative paragraph (OLD - REPLACED)
  const buildNarrativeOld = () => {
    const hipSide = formatHipSide(formData.hipSide);
    const worseSide = formData.hipSide === 'bilateral' ? formatValue(formData.worseSide) : '';
    const painLocation = formatValue(formData.painLocation);
    const injuryHistory = formatInjuryHistory(formData.injuryHistory);
    const injuryDescription = formData.injuryHistory === 'positive' ? formatValue(formData.injuryDescription) : '';
    const previousSurgeries = formatValue(formData.previousSurgeries);
    const symptomDuration = formatValue(formData.symptomDuration);
    const symptomProgression = formatValue(formData.symptomProgression);
    const worstPain = formatValue(formData.worstPainLevel);
    const bestPain = formatValue(formData.bestPainLevel);
    const painDescription = formatValue(formData.painDescription);
    const aggravatingFactors = formatValue(formData.aggravatingFactors);
    const alleviatingFactors = formatValue(formData.alleviatingFactors);
    const associatedSymptoms = formatValue(formData.associatedSymptoms);
    const attemptedTreatments = formatValue(formData.attemptedTreatments);
    const treatmentSuccess = formatSuccess(formData.treatmentSuccess);
    const lumbarSpineHistory = formatInjuryHistory(formData.lumbarSpineHistory);
    const lumbarSpineDescription = formData.lumbarSpineHistory === 'positive' ? formatValue(formData.lumbarSpineDescription) : '';
    const imagingStudies = formatImaging(formData.imagingStudies);

    let narrative = `The patient presents for ${hipSide} hip pain.`;
    
    if (formData.hipSide === 'bilateral' && worseSide) {
      narrative += ` The ${worseSide}.`;
    }
    
    narrative += ` The pain is located at the ${painLocation} aspect of the hip(s). There is a ${injuryHistory} history of injury.`;
    
    if (formData.injuryHistory === 'positive' && injuryDescription) {
      narrative += ` The injury was ${injuryDescription}.`;
    }
    
    narrative += ` Previous hip surgeries consist of ${previousSurgeries}. The symptoms have been present for ${symptomDuration}. The patient's symptoms have been ${symptomProgression}. At worst the pain is rated as a ${worstPain} out of 10. At best, the pain is rated as a ${bestPain} out of 10. The patient's pain is described as ${painDescription}. The symptoms are aggravated by ${aggravatingFactors} and alleviated by ${alleviatingFactors}. The patient has associated symptoms consisting of ${associatedSymptoms}. Thus far, the patient has attempted ${attemptedTreatments} for relief with ${treatmentSuccess} success. The patient has a ${lumbarSpineHistory} history of lumbar spine pathology.`;
    
    if (formData.lumbarSpineHistory === 'positive' && lumbarSpineDescription) {
      narrative += ` The history is ${lumbarSpineDescription}.`;
    }
    
    narrative += ` Previous imaging studies consist of ${imagingStudies}.`;

    return narrative;
  };

  // Set up the PDF
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('New Native Hip - Patient Intake Report', 20, 30);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Add a line separator
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);
  
  // Patient Summary Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Patient Summary', 20, 65);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Split the narrative into lines that fit the page width
  // narrative is already defined above from centralized text generator
  const splitNarrative = doc.splitTextToSize(narrative, 170);
  doc.text(splitNarrative, 20, 80);
  
  // Calculate where to place the next section
  let yPosition = 80 + (splitNarrative.length * 5) + 15;
  
  // Medical History Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Medical History', 20, yPosition);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPosition += 15;
  
  // Medical History Items
  const medicalHistoryItems = [
    `PCP: ${formatValue(formData.pcp)}`,
    `DM2: ${formData.dm2 === 'yes' ? 'Yes' : formData.dm2 === 'no' ? 'No' : 'not specified'}${formData.dm2 === 'yes' ? `, A1C ${formatValue(formData.dm2A1c)}, medications - ${formatValue(formData.dm2Medications)}` : ''}`,
    `Cardiac history: ${formData.cardiacHistory === 'yes' ? 'Yes' : formData.cardiacHistory === 'no' ? 'No' : 'not specified'}${formData.cardiacHistory === 'yes' ? `, diagnosis - ${formatValue(formData.cardiacDiagnosis)}, procedures - ${formatValue(formData.cardiacProcedures)}, Cardiologist - ${formatValue(formData.cardiologist)}` : ''}`,
    `DVT history: ${formData.dvtHistory === 'yes' ? 'Yes' : formData.dvtHistory === 'no' ? 'No' : 'not specified'}${formData.dvtHistory === 'yes' ? `, location - ${formatValue(formData.dvtLocation)}, date - ${formatValue(formData.dvtDate)}` : ''}`,
    `MRSA/SSI: ${formData.mrsaSsi === 'yes' ? 'Yes' : formData.mrsaSsi === 'no' ? 'No' : 'not specified'}${formData.mrsaSsi === 'yes' ? `, location - ${formatValue(formData.mrsaSsiLocation)}, date - ${formatValue(formData.mrsaSsiDate)}` : ''}`,
    `Blood thinners: ${formData.bloodThinners === 'yes' ? 'Yes' : formData.bloodThinners === 'no' ? 'No' : 'not specified'}${formData.bloodThinners === 'yes' ? `, medications - ${formatValue(formData.bloodThinnerMedications)}` : ''}`,
    `Immunosuppression: ${formData.immunosuppression === 'yes' ? 'Yes' : formData.immunosuppression === 'no' ? 'No' : 'not specified'}${formData.immunosuppression === 'yes' ? `, medications - ${formatValue(formData.immunosuppressionMedications)}, diagnosis - ${formatValue(formData.immunosuppressionDiagnosis)}` : ''}`,
    `Opioid use: ${formData.opioidUse === 'yes' ? 'Yes' : formData.opioidUse === 'no' ? 'No' : 'not specified'}${formData.opioidUse === 'yes' ? `, medications - ${formatValue(formData.opioidMedications)}` : ''}`,
    `Tobacco use: ${formData.tobaccoUse === 'yes' ? 'Yes' : formData.tobaccoUse === 'no' ? 'No' : 'not specified'}${formData.tobaccoUse === 'yes' ? `, type - ${formatValue(formData.tobaccoType)}, frequency - ${formatValue(formData.tobaccoFrequency)}` : ''}`,
    `Referred by: ${formatValue(formData.referredBy)}`
  ];
  
  // Add each medical history item
  medicalHistoryItems.forEach((item, index) => {
    const splitItem = doc.splitTextToSize(item, 170);
    doc.text(splitItem, 20, yPosition);
    yPosition += splitItem.length * 5 + 3;
    
    // Check if we need a new page
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  // Footer
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Surgeon Intake Tool', 20, 290);
  
  // Open PDF in new tab
  console.log('Creating PDF blob...');
  const pdfBlob = doc.output('blob');
  console.log('PDF blob created:', pdfBlob);
  
  const pdfUrl = URL.createObjectURL(pdfBlob);
  console.log('PDF URL created:', pdfUrl);
  
  console.log('Opening PDF in new tab...');
  
  // Try multiple methods to open the PDF
  try {
    // Method 1: Direct window.open
    const newWindow = window.open(pdfUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      console.log('Popup blocked, trying alternative method...');
      
      // Method 2: Create a temporary link and click it
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.download = 'hip-intake-report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('PDF download initiated via link click');
    } else {
      console.log('PDF opened in new tab successfully');
    }
  } catch (error) {
    console.error('Error opening PDF:', error);
    
    // Method 3: Fallback - create download link
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'hip-intake-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('PDF download initiated as fallback');
  }
  
  // Clean up the URL after a longer delay
  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 5000);
};
