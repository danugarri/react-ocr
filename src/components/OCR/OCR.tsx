import React from 'react';
import { OCRProps } from './OCR.types';
import { useOCRHandler } from './hooks/useOCRHandler';
import ProgressBar from '../ProgressBar/ProgressBar';
import AlertDialog from '../Dialog/Dialog';

export const OCR: React.FC<OCRProps> = ({ selectedImage, resetSelectedImage }) => {
  const { error, isLoading, text, progress } = useOCRHandler(selectedImage);

  if (isLoading) {
    return <ProgressBar OCRProgress={progress} />;
  } else if (error) {
    return <AlertDialog error={error} resetSelectedImage={resetSelectedImage} />;
  } else {
    return <>{text}</>;
  }
};
