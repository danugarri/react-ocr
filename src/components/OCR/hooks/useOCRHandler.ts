import { useEffect, useState } from 'react';
import { getConfig, getNormalizedText, getPreProcessedImage, getWorker } from '../ocr.helpers';

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
    const ocrHandler = async () => {
      setIsLoading(true);
      try {
        const preProcessedImage = await getPreProcessedImage(selectedImage);
        const { image, langs, options } = getConfig(preProcessedImage, getProgress, errorSetter);
        const worker = await getWorker({ langs, options });

        const {
          data: { text },
        } = await worker.recognize(image, { rotateAuto: true }, { text: true, imageBinary: true });

        if (text) {
          const normalizedText = getNormalizedText(text);
          console.log(text);
          setText(normalizedText);
          setIsLoading(false);
        }
      } catch (e) {
        errorSetter(e as Error);
      }
    };

    if (selectedImage) {
      ocrHandler();
    }
  }, [selectedImage]);

  return { error, isLoading, text, progress };
};
