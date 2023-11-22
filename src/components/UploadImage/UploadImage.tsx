import React from 'react';
import './UploadImage.css';
import { Tooltip } from '@mui/material';
import { UploadImageProps } from './uploadImage.types';

const UploadImage: React.FC<UploadImageProps> = ({
  handleImageChange,
  selectedImage,
  fileInputRef,
}) => {
  return (
    <div>
      <Tooltip title="Supported extensions .bmp, .jpg, .png, .pbm, .webp" placement="right">
        <label htmlFor="input-file" className="uploadImage-label">
          Select an Image
        </label>
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
            alt="Selected-image"
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
