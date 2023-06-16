<template>
    <ClientOnly>
        <BaseContainer>
            <BaseAlert :variant="verificationState">
                {{ verificationFeedback }} You will be redirected shortly...
            </BaseAlert>
        </BaseContainer>
    </ClientOnly>
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
    ERROR = 'error',
}

const verificationState: VerificationState = data?.value?.message
    ? VerificationState.SUCCESS
    : VerificationState.ERROR

const verificationFeedback = data?.value?.message || error?.value?.statusMessage

onMounted(() => {
    setTimeout(() => {
        navigateTo('/')
    }, 3000)
})
</script>
