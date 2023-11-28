import jsPDF from 'jspdf';
import logo from '../../assets/images/favicon.png';
import { textOptions, pageOptions } from './pdfGenerator.consts';
import { addFooter } from './pdfGenerator.helpers';

const { footerHeight, margin, padding, xPos } = pageOptions;
export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  doc.setFont('times', 'roman');
  let yPos = margin;

  const addPage = () => {
    doc.addPage();
    yPos = margin; // Reset yPos for the new page
    addFooter(doc); // Add the footer on each new page
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
      addPage();
    } else if (doc.internal.pages.length - 1 === 1) {
      addFooter(doc);
    }
    // Add text to the PDF
    doc.text(line, xPos, yPos, textOptions);

    // Update yPos for the next line
    yPos += doc.getTextDimensions(line, textOptions).h + padding;

    const imgWidth = 10;
    const imgHeight = 10;

    // Add image at the bottom of the current page
    doc.addImage(
      logo,
      'jpg',
      margin,
      doc.internal.pageSize.height - imgHeight - margin,
      imgWidth,
      imgHeight,
    );
  });

  // Save the PDF
  doc.save('OcrPDF-danugarri.pdf');
};
