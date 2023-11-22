import React, { useRef } from 'react';
import './UploadImage.css';
import { Tooltip } from '@mui/material';

export type UploadImageProps = {
  selectedImage: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage: React.FC<UploadImageProps> = ({ handleImageChange, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the input element
    }
  };

  return (
    <div>
      <Tooltip title="Supported extensions .bmp, .jpg, .png, .pbm, .webp" placement="right">
        <button className="uploadImage-button" onClick={handleSelectImage}>
          <label htmlFor="input-file" className="uploadImage-label">
            Select an Image
          </label>
        </button>
      </Tooltip>
      <input
        type="file"
        id="input-file"
        ref={fileInputRef}
        accept=".bmp, .jpg, .png, .pbm, .webp"
        onChange={handleImageChange}
        className="uploadImage-not-displayed"
      />
      {selectedImage ? (
        <div>
          <p>Selected Image: {selectedImage.name}</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="uploadImage-selected-image"
          />
        </div>
      ) : (
        <p className="uploadImage-no-files">No Files selected</p>
      )}
    </div>
  );
};

export default UploadImage;
