import jsPDF, { TextOptionsLight } from 'jspdf';

export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  const textOptions: TextOptionsLight = {
    align: 'left',
    maxWidth: 185,
  };

  // Set margin and padding
  const margin = 20;
  const padding = 5;

  // Set initial position
  const xPos = margin;
  let yPos = margin;

  // Set page height and width
  const pageHeight = doc.internal.pageSize.height - 2 * margin;
  const pageWidth = doc.internal.pageSize.width - 2 * margin;

  // Split text into lines
  const lines = doc.splitTextToSize(text, pageWidth - 2 * padding);

  // Loop through lines and add to the PDF
  lines.forEach((line: string) => {
    // Check if adding the current line exceeds the page height
    if (yPos + doc.getTextDimensions(line, textOptions).h + padding > pageHeight) {
      // Add a new page if the current line exceeds the page height
      doc.addPage();
      yPos = margin; // Reset yPos for the new page
    }

    // Add text to the PDF
    doc.text(line, xPos, yPos, textOptions);

    // Update yPos for the next line
    yPos += doc.getTextDimensions(line, textOptions).h + padding;
  });

  // Save the PDF
  doc.save('OcrPDF.pdf');
};
