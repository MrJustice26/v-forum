<template>
    <ClientOnly> </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
const activationLink = ref(route.params.activationLink as string)

const { data, error } = await useFetch('/api/auth/activate', {
    method: 'POST',
    body: {
        activationLink,
    },
})

enum VerificationState {
    SUCCESS = 'success',
    FAIL = 'fail',
}

const verificationState: VerificationState = data?.value?.message
    ? VerificationState.SUCCESS
    : VerificationState.FAIL

const verificationFeedback = data?.value?.message || error?.value?.statusMessage

if (verificationState === VerificationState.SUCCESS) {
    // messageController.success(verificationFeedback as string);
} else {
    // messageController.error(verificationFeedback as string);
}
onMounted(() => {
    navigateTo('/')
})
</script>
