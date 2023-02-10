<template>
  <NuxtLink :to="to" class="link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.main-link {
  font-size: 1.5rem;
  font-weight: 600;
}
.link {
  font-weight: 500;
  color: rgb(190, 190, 190);
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  column-gap: 7px;
  transition: color 0.2s linear, background-color 0.2s linear;
  &:hover {
    background-color: transparentize($color-white, 0.85);
    color: white;
  }
  &.main-link {
    background-color: transparent;
  }
}
</style>
