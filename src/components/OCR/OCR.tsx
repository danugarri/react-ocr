import React, { useState } from 'react';
import { OCRProps } from './OCR.types';
import { useOCRHandler } from './hooks/useOCRHandler';
import ProgressBar from '../ProgressBar/ProgressBar';
import AlertDialog from '../Dialog/Dialog';
import { generatePDF } from '../PdfGenerator/pdfGenerator';
import './OCR.css';

export const OCR: React.FC<OCRProps> = ({ selectedImage, resetSelectedImage }) => {
  const { error, isLoading, text, progress } = useOCRHandler(selectedImage);
  const [displayText, setDisplayText] = useState(false);
  if (isLoading) {
    return <ProgressBar {...progress} />;
  } else if (error) {
    return <AlertDialog error={error} resetSelectedImage={resetSelectedImage} />;
  } else if (text) {
    return (
      <>
        <section className="ocr-buttons-container">
          <button onClick={() => generatePDF(text)}>Download PDF</button>
          <button onClick={() => setDisplayText(!displayText)}>Display text</button>
        </section>
        {displayText && (
          <section className="ocr-text-container">
            <pre className="ocr-text">{text}</pre>
          </section>
        )}
      </>
    );
  }
};
