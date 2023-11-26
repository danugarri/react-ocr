import Tesseract from 'tesseract.js';
import { useEffect, useState } from 'react';
import { RecognizeConfigType } from '../OCR.types';
import { OCRStatus } from '../OCR.consts';
import { generatePDF } from '../../PdfGenerator/pdfGenerator';

export const useOCRHandler = (selectedImage: File | null) => {
  const [text, setText] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const errorSetter = (error: Error) => {
    setError(error);
    setIsLoading(false);
  };

  const getProgress = (progress: number) => setProgress(progress);

  useEffect(() => {
    const ocrHandler = async (path: string) => {
      setIsLoading(true);
      const config: RecognizeConfigType = {
        image: path,
        langs: 'eng+spa', // Support for English and Spanish text
        options: {
          logger: ({ progress, status }) => {
            console.log({ status, progress });
            if (status === OCRStatus.RECOGNIZING_TEXT)
              if (progress) {
                getProgress(progress);
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
        generatePDF(text);
        setIsLoading(false);
        setProgress(0);
      }
    };
    if (selectedImage) {
      const path = URL.createObjectURL(selectedImage);
      ocrHandler(path);
    }
  }, [selectedImage]);

  return { error, isLoading, text, progress };
};
