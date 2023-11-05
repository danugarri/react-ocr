import Tesseract, { LoggerMessage } from 'tesseract.js';
import { RecognizeConfigType } from './OCR.types';

export const getText = async (path: string) => {
  let status: string | null = null;
  const config: RecognizeConfigType = {
    image: path,
    langs: 'eng+spa', // Support for English and Spanish text
    options: {
      logger: (message: LoggerMessage) => {
        console.log(message);
        status = message.status;
      },
    },
  };
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(config.image, config.langs, config.options);
    console.log(text);
    return { text, status };
  } catch (e) {
    throw new Error('Something went wrong during the process');
  }
};
