<template>
  <input
    @input="handleInput($event)"
    :class="['input', { error: isError }]"
    :value="inputValue"
  />
</template>

<script setup lang="ts">
import { Ref } from "vue";

interface Props {
  modelValue?: string;
  isError?: boolean;
}
const props = defineProps<Props>();

const inputValue: Ref<string> = ref(props.modelValue || "");

const emit = defineEmits<{
  (event: "update:model-value", value: string): void;
}>();

const handleInput = (e: Event) => {
  inputValue.value = (e.target as HTMLInputElement).value;
  emit("update:model-value", inputValue.value);
};

watch(
  () => props.modelValue,
  (newValue) => (inputValue.value = newValue || "")
);
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

  &.error {
    outline-color: $color-red;
    border-color: $color-red;
    color: $color-red;
    background-color: darken($color-red, 45%);
  }
}
</style>
