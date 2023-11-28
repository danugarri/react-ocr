import jsPDF from 'jspdf';
import logo from '../../assets/images/favicon.png';
import { textOptions, pageOptions, hasOnePage, logoOptions } from './pdfGenerator.consts';
import { addFooter } from './pdfGenerator.helpers';

const { footerHeight, margin, padding, xPos } = pageOptions;
const { imgHeight, imgWidth } = logoOptions;
export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  doc.setFont('times', 'roman');
  let yPos = margin;
  const lines = text.split('\n');

  // Loop through lines and add line to the PDF
  lines.forEach((line: string) => {
    const yAxisHeigth = yPos + doc.getTextDimensions(line, textOptions).h + padding;
    const contentHeigth = doc.internal.pageSize.height - 2 * margin - footerHeight;

    // reset font-size
    doc.setFontSize(14);
    // Check if adding the current line exceeds the page height
    if (yAxisHeigth > contentHeigth) {
      doc.addPage();
      addFooter(doc);
      yPos = margin; // Reset yPos for the new page
    } else if (hasOnePage(doc)) {
      addFooter(doc);
    }
    // Add text to the PDF
    doc.text(line, xPos, yPos, textOptions);

    // Update yPos for the next line
    yPos += doc.getTextDimensions(line, textOptions).h + padding;

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
