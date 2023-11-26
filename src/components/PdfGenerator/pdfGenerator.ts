import jsPDF from 'jspdf';

export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  doc.text(text, 10, 10);
  doc.save('OcrPDF.pdf');
};
