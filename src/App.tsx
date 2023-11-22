import { useState, useRef } from 'react';
import UploadImage from './components/UploadImage/UploadImage';
import { OCR } from './components/OCR/OCR';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectedImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the input element
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      handleSelectedImage();
    }
  };
  const resetSelectedImage = () => setSelectedImage(null);

  return (
    <>
      <UploadImage
        selectedImage={selectedImage}
        handleImageChange={handleImageChange}
        fileInputRef={fileInputRef}
      />
      <OCR selectedImage={selectedImage} resetSelectedImage={resetSelectedImage} />
    </>
  );
}

export default App;
