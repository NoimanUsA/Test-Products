<template>
  <section class="products container">
    <breadcrumbs :links="breadcrumbs" />
    <h1 class="products__title">Комплекты стеллажных систем</h1>
    <div class="products__sorts">
      <product-select
        label="Сортировать по:"
        :options="sortsBy"
        v-model="sortBy"
        :clear-on-double="false"
      />
      <product-select
        label="Материал"
        label-by="name"
        :options="materials"
        v-model="material"
      />
    </div>
    <div class="products__items">
      <product-card
        class="products__item"
        v-for="product in filteredProducts"
        :product="product"
        :key="product.id"
      ></product-card>
    </div>
  </section>
</template>

<script>
import Breadcrumbs from '@/components/Products/ProductsBreadcrumbs';
import ProductSelect from '@/components/Products/ProductsSelect';
import ProductCard from '@/components/Products/ProductCard';
import items from '@/assets/items.json';
import materials from '@/assets/materials.json';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Products',
  components: {
    Breadcrumbs,
    ProductSelect,
    ProductCard,
  },
  setup() {
    const { commit } = useStore();
    const breadcrumbs = [
      {
        text: 'Главная',
        path: '/',
      },
      {
        text: 'Системы хранения',
        path: '/',
      },
      {
        text: 'Комлекты стеллажных систем',
        path: 'products',
      },
    ];
    const sortsBy = [
      {
        id: 1,
        text: 'Цена по возрастанию',
        sortFunc(arr) {
          return arr.sort(
            (a, b) => a.price.current_price - b.price.current_price,
          );
        },
      },
      {
        id: 2,
        text: 'Цена по убыванию',
        sortFunc(arr) {
          return arr.sort(
            (a, b) => b.price.current_price - a.price.current_price,
          );
        },
      },
    ];
    const sortBy = ref(null);
    const material = ref(null);
    const products = ref(null);
    const filteredProducts = computed(() => {
      let arr = products.value;
      console.log(arr);
      if (material.value) {
        arr = arr.filter((item) => item.material === +material.value);
      }
      if (sortBy.value) {
        const { sortFunc } = sortsBy.find((el) => el.id === sortBy.value);
        arr = sortFunc(arr);
      }
      return arr;
    });

    onMounted(() => {
      products.value = items;
      commit('setBasket');
      commit('setFavorites');
    });
    return {
      breadcrumbs,
      material,
      materials,
      sortBy,
      sortsBy,
      filteredProducts,
    };
  },
};
</script>

<style lang="scss">
.products {
  margin-top: 32px;
  margin-bottom: 102px;
  &__title {
    font-size: 36px;
    line-height: 48px;
    font-weight: 600;
    margin-top: 32px;
  }

  &__sorts {
    display: flex;
    gap: 24px;
    margin-top: 32px;
    flex-wrap: wrap;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    row-gap: 48px;
    margin-top: 41px;
    column-gap: 40px;
  }
}

@media (max-width: 768px) {
  .products {
    margin-top: 22px;
    margin-bottom: 70px;
    &__title {
      font-size: 26px;
      line-height: 38px;
      margin-top: 22px;
    }

    &__sorts {
      margin-top: 22px;
      justify-content: space-between;
    }

    &__items {
      column-gap: 20px;
    }
  }
}

@media (max-width: 425px) {
  .products {
    &__sorts {
      flex-direction: column;
    }
    &__items {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
