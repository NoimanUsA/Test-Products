<template>
  <ul class="products-breadcrumbs">
    <li
      class="products-breadcrumbs__item"
      v-for="link in links"
      :key="link.path"
    >
      <router-link class="products-breadcrumbs__link" :to="link.path">{{
        link.text
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
.products-breadcrumbs {
  display: flex;
  text-decoration: none;
  list-style: none;
  height: 25px;
  overflow: auto;
  &__link {
    color: var(--grey-3);
    white-space: nowrap;
    &:after {
      color: var(--grey-3);
      content: "/";
      margin: 0 10px;
    }
    &:hover {
      color: black;
    }
  }
  .router-link-active {
    color: black;
    &:after {
      display: none;
    }
  }
}
</style>
