import jsPDF from 'jspdf';

export const generateFollowupKneeReportPDF = (formData) => {
  console.log('Follow-up Knee PDF Generator called with data:', formData);
  const doc = new jsPDF();
  
  // Set up the document
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Follow-up Native Knee - Patient Report', 20, 30);
  
  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Build the narrative
  const buildNarrative = () => {
    const kneeSide = formData.kneeSide;
    const clinicHistory = formData.clinicHistory;
    const treatmentPlan = formData.treatmentPlan;
    const treatmentPlanOther = formData.treatmentPlanOther;
    const symptomsStatus = formData.symptomsStatus;
    const historyChanges = formData.historyChanges;
    const treatmentConsideration = formData.treatmentConsideration;
    const hasQuestions = formData.hasQuestions;
    const questionsDetails = formData.questionsDetails;

    let narrative = `Follow-up Native Knee presents for ${kneeSide} knee follow-up. They are known to my clinic for history of ${clinicHistory}. At last visit, the treatment plan consisted of ${treatmentPlan}`;
    
    if (treatmentPlan === 'other' && treatmentPlanOther) {
      narrative += ` (${treatmentPlanOther})`;
    }
    
    narrative += `. The symptoms are ${symptomsStatus}. Orthopedic/medical history changes since last being seen consist of ${historyChanges}. The patient is considering ${treatmentConsideration} their current treatment plan.`;
    
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
  
  // Add Follow-up Information section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Follow-up Information', 20, yPosition);
  yPosition += 15;
  
  // Add individual fields
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const fields = [
    { label: 'Knee Side:', value: formData.kneeSide },
    { label: 'Clinic History:', value: formData.clinicHistory },
    { 
      label: 'Treatment Plan:', 
      value: formData.treatmentPlan + (formData.treatmentPlan === 'other' && formData.treatmentPlanOther ? ` (${formData.treatmentPlanOther})` : '')
    },
    { label: 'Symptoms Status:', value: formData.symptomsStatus },
    { label: 'History Changes:', value: formData.historyChanges },
    { label: 'Treatment Consideration:', value: formData.treatmentConsideration },
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
      link.download = 'followup-knee-report.pdf';
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
    link.download = 'followup-knee-report.pdf';
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
