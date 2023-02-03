<template>
  <input @input="handleInput($event)" class="input" />
</template>

<script setup lang="ts">
import { ref, Ref, defineEmits } from "vue";
interface Props {
  value?: string;
  class?: string;
}
const props = defineProps<Props>();

const inputValue: Ref<string> = ref(props.value || "");

const emit = defineEmits<{
  (event: "update:model-value", value: string): void;
}>();

const handleInput = (e: Event) => {
  inputValue.value = (e.target as HTMLInputElement).value;
  emit("update:model-value", inputValue.value);
};
</script>

<style lang="scss" scoped>
.input {
  padding: 0.5rem 0.8rem;
  border: 1px solid $color-white;
  border-radius: 5px;
  background-color: $color-black;
  color: $color-white;

  &:focus {
    outline-color: $color-black;
  }
}
</style>
