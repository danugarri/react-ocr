import Tesseract from 'tesseract.js';
import { RecognizeConfigType } from './OCR.types';
import { OCRStatus } from './OCR.consts';

export const getText = async (
  path: string,
  progressCallback: (progress: number) => void,
  errorSetter: (error: Error) => void,
) => {
  const config: RecognizeConfigType = {
    image: path,
    langs: 'eng+', // Support for English and Spanish text
    options: {
      logger: ({ progress, status }) => {
        if (status === OCRStatus.RECOGNIZING_TEXT)
          if (progressCallback && progress) {
            progressCallback(progress);
          }
      },
      errorHandler: (e) => {
        console.log(e);
        errorSetter(e.toString());
      },
    },
  };
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(config.image, config.langs, config.options);

    if (text) {
      console.log(text);
      return { text };
    } else {
      throw new Error('No text was extracted');
    }
  } catch (e) {
    console.log(e);
    throw new Error('Something went wrong during the process');
  }
};
