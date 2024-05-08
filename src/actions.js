export const ADD_ELEMENT = 'ADD_ELEMENT';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SAVE_ELEMENT = 'SAVE_ELEMENT'; 
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES';

export const addElement = () => ({
  type: ADD_ELEMENT
});

export const updateElement = (index, name, value) => ({
  type: UPDATE_ELEMENT,
  payload: { index, name, value }
});

export const deleteElement = (index) => ({
  type: DELETE_ELEMENT,
  payload: index
});

export const saveElement = (data) => ({ 
  type: SAVE_ELEMENT,
  payload: data
});

export const uploadImages = (images) => ({
  type: UPLOAD_IMAGES,
  payload: images,
});
