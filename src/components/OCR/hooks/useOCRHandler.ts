import Tesseract from 'tesseract.js';
import { useEffect, useState } from 'react';
import { ProgressType, RecognizeConfigType, OCRStatus } from '../OCR.types';
import { progressInitialState } from '../OCR.consts';

export const useOCRHandler = (selectedImage: File | null) => {
  const [text, setText] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<ProgressType>(progressInitialState);

  const errorSetter = (error: Error) => {
    setError(error);
    setIsLoading(false);
  };

  const getProgress = ({ percentage, message }: ProgressType) =>
    setProgress({ percentage, message });

  useEffect(() => {
    const ocrHandler = async (path: string) => {
      setIsLoading(true);
      const config: RecognizeConfigType = {
        image: path,
        langs: 'eng+spa', // Support for English and Spanish text
        options: {
          logger: ({ progress, status }) => {
            console.log({ status, progress });
            getProgress({ percentage: 0, message: status });
            if (status === OCRStatus.RECOGNIZING_TEXT)
              if (progress) {
                getProgress({ percentage: progress, message: status });
              }
          },
          errorHandler: (e) => {
            console.log(e);
            errorSetter(e.toString());
          },
        },
      };

      const {
        data: { text },
      } = await Tesseract.recognize(config.image, config.langs, config.options);

      if (text) {
        console.log(text);
        setText(text);
        setIsLoading(false);
        setProgress(progressInitialState);
      }
    };
    if (selectedImage) {
      const path = URL.createObjectURL(selectedImage);
      ocrHandler(path);
    }
  }, [selectedImage]);

  return { error, isLoading, text, progress };
};
