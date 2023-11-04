import { useState } from 'react';
import './App.css';
import UploadImage from './components/UploadImage/UploadImage';
import { OCR } from './components/OCR/OCR';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <>
      <UploadImage selectedImage={selectedImage} handleImageChange={handleImageChange} />
      <OCR selectedImage={selectedImage} />
    </>
  );
}

export default App;
