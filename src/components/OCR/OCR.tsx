import React from 'react';
import { OCRProps } from './OCR.types';
import { useOCRHandler } from './hooks/useOCRHandler';
import ProgressBar from '../ProgressBar/ProgressBar';
import AlertDialog from '../Dialog/Dialog';

export const OCR: React.FC<OCRProps> = ({ selectedImage }) => {
  const { error, isLoading, text } = useOCRHandler(selectedImage);

  if (isLoading) {
    return <ProgressBar />;
  } else if (error) {
    return <AlertDialog error={error} />;
  } else {
    return <>{text}</>;
  }
};
