<template>
  <div class="product-card">
    <div class="product-card__discount"></div>
    <router-link to="/" class="product-card__image">
      <img :src="require(`@/assets/${product.image.url}`)" alt="" />
    </router-link>
    <div class="product-card__footer">
      <div class="product-card__code">{{ product.code }}</div>
      <router-link to="/" class="product-card__name">{{
        product.name
      }}</router-link>
      <div class="product-card__price-handlers">
        <div class="product-card__prices">
          <div class="product-card__old-price" v-if="product.price.old_price">
            {{ product.price.old_price }}
          </div>
          <div class="product-card__current-price">
            {{ product.price.current_price }}
          </div>
        </div>
        <div class="product-card__handlers">
          <div class="product-card__basket" @click="addToBasket">
            <base-icon v-if="!inBasket" iconName="Basket" />
            <base-icon v-else iconName="AddedToBasket" />
          </div>
          <div class="product-card__favorites" @click="addToFavorite">
            <base-icon v-if="!isFavorite" iconName="AddToFavorite" />
            <base-icon v-else iconName="AddedToFavorite" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/Base/BaseIcon';
import { useStore } from 'vuex';
import { computed, toRef } from 'vue';

export default {
  name: 'ProductCard',
  components: {
    BaseIcon,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const { id } = toRef(props, 'product').value;
    const { state, commit } = useStore();
    function addToFavorite() {
      commit('addToFavorites', id);
    }
    function addToBasket() {
      commit('addToBasket', id);
    }
    const isFavorite = computed(() => state.favorites[id]);
    const inBasket = computed(() => state.basket[id]);

    return {
      isFavorite,
      inBasket,
      addToBasket,
      addToFavorite,
    };
  },
};
</script>

<style lang="scss">
.product-card {
  width: 336px;
  display: flex;
  flex-direction: column;
  padding: 9px 12px;
  border: 1px solid var(--secondary);
  transition: transform 0.5s;
  justify-content: space-between;
  &:hover {
    transform: scale(1.05);
  }
  &__price-handlers {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    justify-self: flex-end;
  }
  &__image {
    width: 238px;
    align-self: center;
    user-select: none;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &__code {
    font-size: 10px;
    margin-top: 23px;
    line-height: 14px;
    color: var(--old-price);
  }
  &__name {
    margin-top: 6px;
    font-size: 16px;
    line-height: 22px;
    color: black;
  }
  &__prices {
    display: flex;
    margin-top: 9px;
    column-gap: 9px;
  }
  &__old-price,
  &__current-price {
    font-size: 16px;
    line-height: 22px;
    &:after {
      content: "\20BD";
    }
  }
  &__old-price {
    color: var(--old-price);
    text-decoration: line-through;
  }

  &__handlers {
    display: flex;
    column-gap: 30px;
  }
  &__basket,
  &__favorites {
    cursor: pointer;
  }
}

@media (max-width: 1500px) {
  .product-card {
    flex: 1 1 20%;
  }
}

@media (max-width: 768px) {
  .product-card {
    flex: 1 1 48%;
    display: flex;
    &__price-handlers {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;
    }
    &__handlers {
      column-gap: 10px;
    }
  }
}
</style>
