import jsPDF, { TextOptionsLight } from 'jspdf';

export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  const textOptions: TextOptionsLight = {
    align: 'left',
    maxWidth: 185,
  };

  // Set margin, padding, and footer height
  const margin = 20;
  const padding = 5;
  const footerHeight = 15;

  // Set initial position
  const xPos = 10;
  let yPos = margin;

  const addPage = () => {
    doc.addPage();
    yPos = margin; // Reset yPos for the new page
    addFooter(); // Add the footer on each new page
  };

  const addFooter = () => {
    const pageNumber = doc.internal.pages.length - 1;

    doc.setFontSize(12);
    doc.text(`Page ${pageNumber}`, 185, doc.internal.pageSize.height - margin, {});
  };

  // Loop through lines and add to the PDF
  text.split('\n').forEach((line: string) => {
    // reset font-size
    doc.setFontSize(14);
    // Check if adding the current line exceeds the page height
    if (
      yPos + doc.getTextDimensions(line, textOptions).h + padding >
      doc.internal.pageSize.height - 2 * margin - footerHeight
    ) {
      addFooter();
      addPage();
    }

    // Add text to the PDF
    doc.text(line, xPos, yPos, textOptions);

    // Update yPos for the next line
    yPos += doc.getTextDimensions(line, textOptions).h + padding;
  });

  // Save the PDF
  doc.save('OcrPDF-danugarri.pdf');
};
