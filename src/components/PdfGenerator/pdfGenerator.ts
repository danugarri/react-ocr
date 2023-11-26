import jsPDF, { TextOptionsLight } from 'jspdf';

export const generatePDF = (text: string) => {
  const doc = new jsPDF();
  const textOptions: TextOptionsLight = {
    align: 'left',
    maxWidth: 100,
  };
  doc.setFont('times', 'italic');
  doc.text(text, 10, 10, textOptions);
  doc.save('OcrPDF.pdf');
};
