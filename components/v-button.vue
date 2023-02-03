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
    background: $color-black;
    &:hover {
      background: lighten($color-black, 10%);
    }
  }
}
</style>
