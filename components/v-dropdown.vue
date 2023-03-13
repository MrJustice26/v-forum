<template>
  <div
    class="dropdown"
    @mouseover="setMenuVisible(true)"
    @mouseleave="setMenuVisible(false)"
  >
    <n-button secondary strong class="dropdown__title" variant="success">
      <slot name="title" />
    </n-button>
    <Transition>
      <ul class="dropdown-list" v-if="isMenuVisible">
        <slot />
      </ul>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { NButton } from "naive-ui";
const isMenuVisible = ref(false);

const setMenuVisible = (bool: boolean) => {
  isMenuVisible.value = bool;
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__title {
    display: flex;
    column-gap: 10px;
    align-items: center;
    border-radius: 0;
  }
  &-list {
    width: 100%;
    margin: 0;
    list-style: none;
    position: absolute;
    padding: 0;
    background-color: darken($color-white, 70%);
    :deep(li) {
      button {
        display: flex;
        align-items: center;
        column-gap: 7px;
        width: 100%;
        border-radius: 0;

        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
