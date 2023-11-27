export type RecognizeConfigType = {
  image: Tesseract.ImageLike;
  langs?: string;
  options?: Partial<Tesseract.WorkerOptions>;
};
export type OCRProps = {
  selectedImage: File | null;
  resetSelectedImage: () => void;
};

export enum OCRStatus {
  RECOGNIZING_TEXT = 'recognizing text',
}

export type ProgressType = { percentage: number; message: null | string };
