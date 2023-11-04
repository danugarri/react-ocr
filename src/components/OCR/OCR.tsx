import React, { useEffect, useState } from 'react';
import { getText } from './OCR.helpers';
import { OCRProps } from './OCR.types';

export const OCR: React.FC<OCRProps> = ({ selectedImage }) => {
  const [text, setText] = useState<string>();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<Error>();

  const ocrHandler = async (path: string) => {
    setIsloading(true);
    try {
      console.log(path);
      const { text } = await getText(path);
      if (text) {
        setIsloading(false);
      }
      setText(text);
    } catch (e) {
      setIsloading(false);
      if (e instanceof Error) setError(e);
      throw new Error('Error');
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const path = URL.createObjectURL(selectedImage);
      ocrHandler(path);
    }
  }, [selectedImage]);
  return <div>{text}</div>;
};
