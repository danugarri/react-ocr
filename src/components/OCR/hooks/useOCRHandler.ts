import { useEffect, useState } from 'react';
import { getConfig, getNormalizedText, getPreProcessedImage, workersSetUp } from '../ocr.helpers';
import Tesseract from 'tesseract.js';

export const useOCRHandler = (selectedImage: File | null) => {
  const [text, setText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const errorSetter = (error: Error) => {
    setError(error);
    setIsLoading(false);
  };

  const getProgress = (progress: number) => setProgress(progress);
  useEffect(() => {
    const scheduler = Tesseract.createScheduler();
    const ocrHandler = async () => {
      setIsLoading(true);
      try {
        const preProcessedImage = await getPreProcessedImage(selectedImage);
        const { image, langs, options } = getConfig(preProcessedImage, getProgress, errorSetter);
        await workersSetUp(scheduler, { langs, options }, 8);

        const {
          data: { text },
        } = await scheduler.addJob(
          'recognize',
          image,
          { rotateAuto: true },
          { text: true, imageBinary: true },
        );

        if (text) {
          const normalizedText = getNormalizedText(text);
          console.log(text);
          setText(normalizedText);
          setIsLoading(false);
        }
      } catch (e) {
        errorSetter(e as Error);
        console.log(e);
      }
    };

    if (selectedImage) {
      ocrHandler();
    }
  }, [selectedImage]);

  return { error, isLoading, text, progress };
};
