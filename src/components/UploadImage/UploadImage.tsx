import React from 'react';

export type UploadImageProps = {
  selectedImage: File | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadImage: React.FC<UploadImageProps> = ({ handleImageChange, selectedImage }) => {
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <p>Selected Image: {selectedImage.name}</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ width: '80px', height: '80px' }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
