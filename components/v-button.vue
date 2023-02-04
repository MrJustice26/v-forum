<template>
  <button><slot /></button>
</template>

<style lang="scss">
.btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  &.btn-primary {
    color: $color-white;
    background: $color-green;
    transition: background-color 0.2s ease-out;
    &:not(:disabled):hover {
      background: darken($color-green, 5%);
    }
  }
  &:disabled {
    cursor: unset;
    background-color: darken($color-white, 40%);
  }
}
</style>
