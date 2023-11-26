import React, { useState } from 'react';
import { OCRProps } from './OCR.types';
import { useOCRHandler } from './hooks/useOCRHandler';
import ProgressBar from '../ProgressBar/ProgressBar';
import AlertDialog from '../Dialog/Dialog';
import { generatePDF } from '../PdfGenerator/pdfGenerator';

export const OCR: React.FC<OCRProps> = ({ selectedImage, resetSelectedImage }) => {
  const { error, isLoading, text, progress } = useOCRHandler(selectedImage);
  const [displayText, setDisplayText] = useState(false);
  if (isLoading) {
    return <ProgressBar OCRProgress={progress} />;
  } else if (error) {
    return <AlertDialog error={error} resetSelectedImage={resetSelectedImage} />;
  } else {
    return (
      <>
        <button onClick={() => generatePDF(text)}>Download PDF</button>
        <button onClick={() => setDisplayText(!displayText)}>Display text</button>
        {displayText && <p>{text}</p>}
      </>
    );
  }
};
