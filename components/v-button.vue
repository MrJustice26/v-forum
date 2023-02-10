<template>
  <button :class="['btn', getVariantClassname]"><slot /></button>
</template>

<script lang="ts" setup>
interface ButtonProps {
  variant?: "success" | "danger" | "primary";
}

const props = defineProps<ButtonProps>();

const getVariantClassname = computed(() =>
  props.variant ? `btn--${props.variant}` : ""
);
</script>

<style lang="scss">
.btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease-out;

  &.btn--success {
    color: $color-white;
    background: $color-green;
    &:not(:disabled):hover {
      background: darken($color-green, 5%);
    }
  }
  &.btn--danger {
    color: $color-white;
    background: darken($color-red, 10%);
    &:not(:disabled):hover {
      background: $color-darken-red;
    }
  }
  &.btn--primary {
    color: $color-white;
    background: darken($color-white, 70%);
    &:not(:disabled):hover {
      background: darken($color-white, 80%);
    }
  }
  &:disabled {
    cursor: unset;
    background-color: darken($color-white, 40%);
  }
}
</style>
