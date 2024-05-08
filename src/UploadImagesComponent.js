import React from 'react';
import { connect } from 'react-redux';
import { addImage } from './actions';

const ImageUploadForm = ({ addImage }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addImage(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} multiple />
    </div>
  );
};

export default connect(null, { addImage })(ImageUploadForm);