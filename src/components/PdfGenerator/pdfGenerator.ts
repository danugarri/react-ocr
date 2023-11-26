import jsPDF from 'jspdf';

export const generatePDF = (text: string | undefined) => {
  if (text) {
    const doc = new jsPDF();
    doc.setFont('times', 'italic');
    doc.text(text, 10, 10);
    doc.save('OcrPDF.pdf');
  }
};
