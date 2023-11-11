export type RecognizeConfigType = {
  image: Tesseract.ImageLike;
  langs?: string | undefined;
  options?: Partial<Tesseract.WorkerOptions>;
};
export type OCRProps = {
  selectedImage: File | null;
  resetSelectedImage: () => void;
};

export type ConfigType = {
  image: string;
  langs?: string | undefined;
  options?: Partial<Tesseract.WorkerOptions> | undefined;
};
