import jsPDF, { TextOptionsLight } from 'jspdf';

export const textOptions: TextOptionsLight = {
  align: 'left',
  maxWidth: 185,
};

export const pageOptions = {
  margin: 20,
  padding: 5,
  footerHeight: 15,
  xPos: 10,
};

export const logoOptions = {
  imgWidth: 10,
  imgHeight: 10,
};

export const hasOnePage = (doc: jsPDF) => doc.internal.pages.length - 1 === 1;
