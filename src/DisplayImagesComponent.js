import React from 'react';
import { connect } from 'react-redux';
import { deleteImage } from './actions';

const ImagePreview = ({ images, deleteImage }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Preview ${index}`} />
          <button onClick={() => deleteImage(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.images,
});

export default connect(mapStateToProps, { deleteImage })(ImagePreview);