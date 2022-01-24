<template>
  <div
    class="products-select"
    :class="{ 'products-select--active': isSelectActive }"
  >
    <div class="products-select__label">{{ label }}</div>
    <div class="products-select__content" @click="activateSelect">
      <div class="products-select__value">{{ currentLabel }}</div>
      <div class="products-select__icon"></div>
      <ul class="products-select__options" v-if="isSelectActive">
        <li
          class="products-select__option"
          v-for="option in options"
          :key="option"
          @click="selectValue(option[valueBy])"
        >
          {{ option[labelBy] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, toRefs } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: null,
    },
    labelBy: {
      type: String,
      default: 'text',
    },
    valueBy: {
      type: String,
      default: 'id',
    },
    modelValue: {
      type: [String, Array, Number],
      default: null,
    },
    clearOnDouble: {
      type: Boolean,
      default: true,
    },
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      options, valueBy, labelBy, modelValue, clearOnDouble,
    } = toRefs(props);
    const isSelectActive = ref(false);
    const currentLabel = computed(() => {
      if (modelValue.value) {
        return options.value.find(
          (item) => item[valueBy.value] === modelValue.value,
        )[labelBy.value];
      }
      return null;
    });
    function activateSelect() {
      isSelectActive.value = !isSelectActive.value;
    }
    function selectValue(value) {
      if (modelValue.value === value) {
        return clearOnDouble.value ? emit('update:modelValue', null) : false;
      }
      emit('update:modelValue', value);
      return true;
    }
    return {
      isSelectActive,
      activateSelect,
      selectValue,
      currentLabel,
    };
  },
};
</script>

<style lang="scss">
.products-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 288px;
    height: 40px;
    padding: 10px 16px;
    background: var(--secondary);
    margin-top: 6px;
  }
  &__icon {
    background: url("~@/assets/icons/select-arrow.svg") no-repeat center;
    width: 20px;
    height: 20px;
    transition: all 0.5s;
  }
  &__label {
    color: var(--grey-2);
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    margin-left: 15px;
  }
  &__value {
    font-size: 14px;
    line-height: 21px;
    color: black;
  }
  &__options {
    position: absolute;
    list-style: none;
    left: 0;
    top: 70px;
    width: 100%;
    z-index: 1000;
  }
  &__option {
    cursor: pointer;
    padding: 10px;
    background: var(--secondary);
    &:hover {
      background: var(--grey-4);
    }
  }
}

.select--active {
  .products-select__icon {
    transform: rotate(180deg);
  }
}

@media (max-width: 768px) {
  .products-select {
    flex: 1 1 40%;
  }
  .products-select__content {
    width: 100%;
  }
}
</style>
