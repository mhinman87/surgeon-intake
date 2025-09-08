import jsPDF from 'jspdf';

export const generateUnplannedTHAReportPDF = (formData) => {
  console.log('Unplanned THA PDF Generator called with data:', formData);
  const doc = new jsPDF();
  
  // Set up the document
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Unplanned <1-year post-op THA - Patient Report', 20, 30);
  
  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Build the narrative
  const buildNarrative = () => {
    const hipSide = formData.hipSide;
    const surgeryType = formData.surgeryType;
    const surgeryDate = formData.surgeryDate;
    const surgeryLocation = formData.surgeryLocation;
    const returnReason = formData.returnReason;
    const injuryHistory = formData.injuryHistory;
    const injuryDetails = formData.injuryDetails;
    const attemptedRelief = formData.attemptedRelief;
    const reliefSuccess = formData.reliefSuccess;
    const associatedSymptoms = formData.associatedSymptoms;
    const aggravatedBy = formData.aggravatedBy;
    const alleviatedBy = formData.alleviatedBy;
    const painMedication = formData.painMedication;
    const ambulationStatus = formData.ambulationStatus;
    const assistiveDevices = formData.assistiveDevices;
    const normalActivity = formData.normalActivity;
    const hasQuestions = formData.hasQuestions;
    const questionsDetails = formData.questionsDetails;

    let narrative = `Unplanned <1-year post-op THA presents s/p ${hipSide} ${surgeryType} THA on ${surgeryDate} at ${surgeryLocation} performed by myself. The patient was last seen at their post-op visit and found to be progressing within normal limits. The next planned follow-up was to be at 1 year following surgery. The patient returns early today due to ${returnReason}. Since last visit there is ${injuryHistory} injury history.`;
    
    if (injuryHistory === 'positive' && injuryDetails) {
      narrative += ` ${injuryDetails}.`;
    }
    
    narrative += ` The patient has attempted ${attemptedRelief} for relief with ${reliefSuccess} success. The patient's associated symptoms are ${associatedSymptoms}. The symptoms are aggravated by ${aggravatedBy} and alleviated by ${alleviatedBy}. They are using ${painMedication} medication for discomfort. The patient is ambulating ${ambulationStatus} assistive devices.`;
    
    if (ambulationStatus === 'with' && assistiveDevices) {
      narrative += ` ${assistiveDevices}.`;
    }
    
    narrative += ` They ${normalActivity} returned to normal daily activity.`;
    
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
  
  // Add Unplanned Visit Information section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Unplanned Visit Information', 20, yPosition);
  yPosition += 15;
  
  // Add individual fields
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const fields = [
    { label: 'Hip Side:', value: formData.hipSide },
    { label: 'Surgery Type:', value: formData.surgeryType },
    { label: 'Surgery Date:', value: formData.surgeryDate },
    { label: 'Surgery Location:', value: formData.surgeryLocation },
    { label: 'Return Reason:', value: formData.returnReason },
    { 
      label: 'Injury History:', 
      value: formData.injuryHistory + (formData.injuryHistory === 'positive' && formData.injuryDetails ? ` - ${formData.injuryDetails}` : '')
    },
    { label: 'Attempted Relief:', value: formData.attemptedRelief },
    { label: 'Relief Success:', value: `${formData.reliefSuccess} success` },
    { label: 'Associated Symptoms:', value: formData.associatedSymptoms },
    { label: 'Aggravated By:', value: formData.aggravatedBy },
    { label: 'Alleviated By:', value: formData.alleviatedBy },
    { label: 'Pain Medication:', value: formData.painMedication },
    { 
      label: 'Ambulation:', 
      value: `${formData.ambulationStatus} assistive devices` + (formData.ambulationStatus === 'with' && formData.assistiveDevices ? ` (${formData.assistiveDevices})` : '')
    },
    { label: 'Normal Activity:', value: `${formData.normalActivity} returned to normal daily activity` },
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
      link.download = 'unplanned-tha-report.pdf';
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
    link.download = 'unplanned-tha-report.pdf';
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
