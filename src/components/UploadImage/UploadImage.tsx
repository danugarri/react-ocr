import React from 'react';
import './UploadImage.css';

export type UploadImageProps = {
  selectedImage: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadImage: React.FC<UploadImageProps> = ({ handleImageChange, selectedImage }) => {
  return (
    <div>
      <button className="uploadImage-button">
        <label htmlFor="input-file" className="uploadImage-label">
          Select an Image
        </label>
      </button>
      <input
        type="file"
        id="input-file"
        accept="image/*"
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
