<template>
  <div :class="['alert', `alert--${getAlertClassName}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface AlertProps {
  variant: "danger" | "success";
}
const props = defineProps<AlertProps>();

const getAlertClassName = computed(() => props.variant);
</script>

<style scoped lang="scss">
.alert {
  padding: 1rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;

  &.alert--danger {
    border: 1px solid $color-red;
    background-color: $bg-red;
  }
  &.alert--success {
    border: 1px solid $color-green;
    background-color: $bg-green;
  }
}
</style>
