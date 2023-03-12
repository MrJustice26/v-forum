<template>
  <ClientOnly> </ClientOnly>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
const route = useRoute();
const activationLink = ref(route.params.activationLink as string);

const messageController = useMessage();

const { data, error } = await useFetch("/api/auth/activate", {
  method: "POST",
  body: {
    activationLink,
  },
});

enum VerificationState {
  SUCCESS = "success",
  FAIL = "fail",
}

const verificationState: VerificationState = data?.value?.message
  ? VerificationState.SUCCESS
  : VerificationState.FAIL;

const verificationFeedback =
  data?.value?.message || error?.value?.statusMessage;

if (verificationState === VerificationState.SUCCESS) {
  messageController.success(verificationFeedback as string);
} else {
  messageController.error(verificationFeedback as string);
}
onMounted(() => {
  navigateTo("/");
});
</script>

<style lang="scss" scoped>
.activation-result {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  margin-top: 3rem;

  :deep(.link) {
    display: inline-flex;
  }
}
</style>
