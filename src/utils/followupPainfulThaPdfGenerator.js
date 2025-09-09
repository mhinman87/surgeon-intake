import jsPDF from 'jspdf';
import { generatePatientReportText } from './textGenerator';

export const generateFollowupPainfulTHAReportPDF = (formData) => {
  console.log('Follow-up painful THA PDF Generator called with data:', formData);
  const doc = new jsPDF();
  
  // Set up the document
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Follow-up painful THA - Patient Report', 20, 30);
  
  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Use centralized text generator
  const fullReportText = generatePatientReportText(formData, 'followup');
  const lines = fullReportText.split('\n');
  
  // Extract just the narrative part (skip "PATIENT SUMMARY:" header)
  const narrativeStartIndex = lines.findIndex(line => line.trim() === 'PATIENT SUMMARY:') + 2;
  const narrativeEndIndex = lines.findIndex(line => line.trim() === 'MEDICAL HISTORY:');
  const narrativeLines = narrativeEndIndex > -1 ? 
    lines.slice(narrativeStartIndex, narrativeEndIndex) : 
    lines.slice(narrativeStartIndex);
  
  const narrative = narrativeLines.join(' ').trim();

  // Add the narrative
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
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
    { label: 'Hip Side:', value: formData.hipSide },
    { label: 'Known History:', value: formData.knownHistory },
    { 
      label: 'Treatment Plan:', 
      value: formData.treatmentPlan + (formData.treatmentPlan === 'other' && formData.otherTreatment ? ` - ${formData.otherTreatment}` : '')
    },
    { label: 'History Changes:', value: formData.historyChanges },
    { label: 'Symptoms Status:', value: formData.symptomsStatus },
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
      link.download = 'followup-painful-tha-report.pdf';
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
    link.download = 'followup-painful-tha-report.pdf';
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
