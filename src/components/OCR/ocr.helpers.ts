import Tesseract, { OEM } from 'tesseract.js';
import { OCRStatus } from './OCR.consts';
import { ConfigType, RecognizeConfigType } from './OCR.types';

export const getPreProcessedImage = async (selectedImage: File | null) =>
  await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Error reading image'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading image'));
    };

    reader.readAsDataURL(selectedImage as Blob);
  });

export const getWorker = async ({ langs, options }: Omit<ConfigType, 'image'>) =>
  await Tesseract.createWorker(langs, OEM.DEFAULT, {
    logger: options?.logger,
    errorHandler: options?.errorHandler,
  });
export const getConfig = (
  preProcessedImage: string,
  getProgress: (progress: number) => void,
  errorSetter: (error: Error) => void,
) => {
  const config: RecognizeConfigType = {
    image: preProcessedImage,
    langs: 'eng+spa',
    options: {
      logger: ({ progress, status }) => {
        console.log({ status, progress });
        if (status === OCRStatus.RECOGNIZING_TEXT && progress) {
          getProgress(progress);
        }
      },
      errorHandler: (e) => {
        console.error(e);
        errorSetter(e as Error);
      },
    },
  };

  return { ...config };
};

export const getNormalizedText = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
