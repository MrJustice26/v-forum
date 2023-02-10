<template>
  <i v-html="svg"></i>
</template>

<script lang="ts" setup>
import feather from "feather-icons";

const props = defineProps<{ icon: string }>();
const svg = ref("");
svg.value = feather.icons[props.icon].toSvg();
</script>

<style scoped>
i {
  display: flex;
}
</style>
