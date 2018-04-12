import * as types from '../constants/actionTypes';

export function loadFromStorage() {

  //obtener data del storage
  const data = JSON.parse(window.localStorage.naventDemo || "{}");

  return dispatch => {
    dispatch({
      type: types.LOAD_DATA,
      data
    })
  }
}

export function saveEmail(email) {
  return dispatch => {
    dispatch({
      type: types.SAVE_EMAIL
    })
  }
}

export function saveFavorite() {
  return dispatch => {
    //salvar el favorito en localStorage

    const data = JSON.parse(window.localStorage.naventDemo || "{}");
    data.favorite = !data.favorite;
    window.localStorage.naventDemo = JSON.stringify(data);

    dispatch({
      type: types.TOGGLE_FAVORITE
    });
  }
}

export function changePrice(price) {
  return dispatch => {
    //salvar precio en localStoreage

    const data = JSON.parse(window.localStorage.naventDemo || "{}");
    data.price = price;
    window.localStorage.naventDemo = JSON.stringify(data);

    dispatch({
      type: types.SAVE_PRICE,
      price
    })
  }
}

