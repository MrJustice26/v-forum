<template>
  <span :class="getAlertClassName">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface AlertProps {
  variant: "danger" | "success";
}
const props = defineProps<AlertProps>();

const getAlertClassName = computed(() => `badge badge-${props.variant}`);
const test = useState("test", () => "hello");
</script>

<style lang="scss" scoped>
.badge {
  color: $color-white;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  &-danger {
    background-color: $color-darken-red;
  }
  &-success {
    background-color: $color-green;
  }
}
</style>
