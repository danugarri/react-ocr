import { useEffect, useState } from 'react';
import { getText } from '../OCR.helpers';

export const useOCRHandler = (selectedImage: File | null) => {
  const [text, setText] = useState<string>();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<Error>();
  const [progress, setProgress] = useState(0);

  const errorSetter = (error: Error) => {
    setError(error);
    setIsloading(false);
  };

  const getProgress = (progress: number) => setProgress(progress);

  useEffect(() => {
    const ocrHandler = async (path: string) => {
      setIsloading(true);
      try {
        const { text } = await getText(path, getProgress, errorSetter);
        if (text) {
          console.log(text);
          setIsloading(false);
        }
        setText(text);
      } catch (e) {
        setIsloading(false);
        console.error(e, 'eeeeeeeeeee');
      }
    };
    if (selectedImage) {
      const path = URL.createObjectURL(selectedImage);
      ocrHandler(path);
    }
  }, [selectedImage]);

  return { error, isLoading, text, progress };
};
