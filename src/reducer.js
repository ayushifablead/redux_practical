import { ADD_ELEMENT, UPDATE_ELEMENT, DELETE_ELEMENT, SAVE_ELEMENT, UPLOAD_IMAGES } from './actions';

const initialState = {
  data: [{ fname: '' ,price:'' ,pcategory:'',  file: [],}],
  uploadedImages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELEMENT:
      if (state.data.length < 5) {
        return {
          ...state,
          data: [...state.data, { fname: '',pcategory:'',price:''}]
        };
      }
      return state; 
    case UPDATE_ELEMENT:
      const { index, name, value } = action.payload;
      const updatedData = state.data.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        }
        return item;
      });
      return {
        ...state,
        data: updatedData
      };
    case DELETE_ELEMENT:
      return {
        ...state,
        data: state.data.filter((val, index) => index !== action.payload)
      };
    case UPLOAD_IMAGES:
      return {
        ...state,
        uploadedImages: [...state.uploadedImages, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
