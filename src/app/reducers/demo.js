import * as types from '../constants/actionTypes';

const initialState = {
  title: 'Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro',
  location: 'Juan Francisco Seguí 3900, Palermo Chico, Palermo, CABA',
  description: `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
    cuando un impresor (N. del T. persona que se dedica a la imprenta)`,
  price: 1400000,
  currency: 'usd',
  superficie: 380,
  favorite: false,
  amenities: [
    {
      name: "Dormitorios",
      quantity: 2
    },
    {
      name: "Banos",
      quantity: 2
    },
    {
      name: "Cocheras",
      quantity: 2
    },
  ],
  images: [
    {
      src: '/images/1631264332.jpg'
    },
    {
      src: '/images/1631264333.jpg'
    },
    {
      src: '/images/1631264334.jpg'
    }
  ]
};

export default function demoReducer(state = initialState, action) {

    if (action.type === types.TOGGLE_FAVORITE) {
      const newState = Object.assign({}, state);
      newState.favorite = !newState.favorite;
      return newState;
    }

    if (action.type === types.SAVE_PRICE) {
      const newState = Object.assign({}, state);
      newState.price = action.price;
      return newState;
    }

    if (action.type === types.LOAD_DATA) {
      const newState = Object.assign({}, state);
      newState.favorite = action.data.favorite
      newState.price = action.data.price;
      return newState;
    }


  return state;
}