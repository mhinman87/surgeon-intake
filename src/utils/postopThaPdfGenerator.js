import jsPDF from 'jspdf';

export const generatePostopTHAReportPDF = (formData) => {
  console.log('Post-op THA PDF Generator called with data:', formData);
  const doc = new jsPDF();
  
  // Set up the document
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Post-op THA - Patient Report', 20, 30);
  
  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Build the narrative
  const buildNarrative = () => {
    const hipSide = formData.hipSide;
    const surgeryType = formData.surgeryType;
    const surgeryDate = formData.surgeryDate;
    const surgeryLocation = formData.surgeryLocation;
    const historyChanges = formData.historyChanges;
    const progressLevel = formData.progressLevel;
    const recoveryPercentage = formData.recoveryPercentage;
    const therapyWeeks = formData.therapyWeeks;
    const therapyLocation = formData.therapyLocation;
    const therapyVisitsPerWeek = formData.therapyVisitsPerWeek;
    const therapyDischarged = formData.therapyDischarged;
    const ambulationStatus = formData.ambulationStatus;
    const assistiveDevices = formData.assistiveDevices;
    const painMedication = formData.painMedication;
    const symptomRelief = formData.symptomRelief;
    const satisfaction = formData.satisfaction;
    const hasQuestions = formData.hasQuestions;
    const questionsDetails = formData.questionsDetails;

    let narrative = `Post-op THA presents s/p ${hipSide} ${surgeryType} THA on ${surgeryDate} at ${surgeryLocation} performed by myself. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient feels as if they are making ${progressLevel} progress and feels ${recoveryPercentage} recovered. They have participated in ${therapyWeeks} weeks of therapy at ${therapyLocation} ${therapyVisitsPerWeek} visits per week. They ${therapyDischarged} been discharged from therapy. The patient is ambulating ${ambulationStatus} assistive devices.`;
    
    if (ambulationStatus === 'with' && assistiveDevices) {
      narrative += ` ${assistiveDevices}.`;
    }
    
    narrative += ` They are using ${painMedication} medication for discomfort. The patient has ${symptomRelief} relief of their pre-operative symptoms. The patient ${satisfaction} satisfied with their results thus far.`;
    
    if (hasQuestions === 'yes') {
      narrative += ` Questions/concerns? Yes - ${questionsDetails}`;
    } else {
      narrative += ` Questions/concerns? No`;
    }

    return narrative;
  };

  // Add the narrative
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const narrative = buildNarrative();
  const splitNarrative = doc.splitTextToSize(narrative, 170);
  doc.text(splitNarrative, 20, 50);
  
  // Calculate Y position after narrative
  let yPosition = 50 + (splitNarrative.length * 6) + 20;
  
  // Add Post-operative Information section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Post-operative Information', 20, yPosition);
  yPosition += 15;
  
  // Add individual fields
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const fields = [
    { label: 'Hip Side:', value: formData.hipSide },
    { label: 'Surgery Type:', value: formData.surgeryType },
    { label: 'Surgery Date:', value: formData.surgeryDate },
    { label: 'Surgery Location:', value: formData.surgeryLocation },
    { label: 'History Changes:', value: formData.historyChanges },
    { label: 'Progress Level:', value: formData.progressLevel },
    { label: 'Recovery Percentage:', value: formData.recoveryPercentage },
    { label: 'Therapy Details:', value: `${formData.therapyWeeks} weeks at ${formData.therapyLocation}, ${formData.therapyVisitsPerWeek} visits per week` },
    { label: 'Therapy Discharge:', value: `${formData.therapyDischarged} been discharged` },
    { 
      label: 'Ambulation:', 
      value: `${formData.ambulationStatus} assistive devices` + (formData.ambulationStatus === 'with' && formData.assistiveDevices ? ` (${formData.assistiveDevices})` : '')
    },
    { label: 'Pain Medication:', value: formData.painMedication },
    { label: 'Symptom Relief:', value: `${formData.symptomRelief} relief` },
    { label: 'Satisfaction:', value: `${formData.satisfaction} satisfied` },
    { 
      label: 'Questions/Concerns:', 
      value: formData.hasQuestions + (formData.hasQuestions === 'yes' && formData.questionsDetails ? ` - ${formData.questionsDetails}` : '')
    },
  ];
  
  fields.forEach(field => {
    doc.setFont('helvetica', 'bold');
    doc.text(field.label, 20, yPosition);
    doc.setFont('helvetica', 'normal');
    
    // Handle long text by splitting it
    const splitValue = doc.splitTextToSize(field.value, 120);
    doc.text(splitValue, 80, yPosition);
    yPosition += splitValue.length * 5 + 5;
  });
  
  // Add footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated on ' + new Date().toLocaleDateString(), 20, pageHeight - 20);
  
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
      link.download = 'postop-tha-report.pdf';
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
    link.download = 'postop-tha-report.pdf';
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
