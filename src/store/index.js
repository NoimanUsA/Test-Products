import { createStore } from 'vuex';

export default createStore({
  state: {
    favorites: null,
    basket: null,
  },
  mutations: {
    addToBasket(state, id) {
      state.basket[id] = !state.basket[id];
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    setBasket(state) {
      const basket = JSON.parse(localStorage.getItem('basket')) || {};
      state.basket = basket;
    },
    addToFavorites(state, id) {
      state.favorites[id] = !state.favorites[id];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFavorites(state) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
      state.favorites = favorites;
    },
  },
});
