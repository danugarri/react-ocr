import React from 'react';
import { OCRProps } from './OCR.types';
import { useOCRHandler } from './hooks/useOCRHandler';

export const OCR: React.FC<OCRProps> = ({ selectedImage }) => {
  const { error, isLoading, text } = useOCRHandler(selectedImage);

  if (isLoading) {
    return <>{'spinner'}</>;
  } else if (error) {
    return <>{'Pop-up'}</>;
  } else {
    return <>{text}</>;
  }
};
