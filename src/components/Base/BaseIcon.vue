<template>
  <component :is="iconName" />
</template>

<script>
import AddToFavorite from '@/components/Icons/AddToFavorite';
import AddedToFavorite from '@/components/Icons/AddedToFavorite';
import Basket from '@/components/Icons/Basket';
import AddedToBasket from '@/components/Icons/AddedToBasket';

export default {
  name: 'BaseIcon',
  props: {
    iconName: {
      type: String,
      default: '',
    },
  },
  components: {
    AddToFavorite,
    AddedToFavorite,
    Basket,
    AddedToBasket,
  },
};
</script>
