import jsPDF from 'jspdf';
import { pageOptions } from './pdfGenerator.consts';
const { margin } = pageOptions;

export const addFooter = (doc: jsPDF) => {
  const pageNumber = doc.internal.pages.length - 1;

  doc.setFontSize(12);
  doc.text(`Page ${pageNumber}`, 185, doc.internal.pageSize.height - margin, {});
};
