<template>
    <div
        class="py-3 px-5 font-medium border rounded-md text-white"
        :class="alertVariantClassNames"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
interface BaseAlert {
    variant?: 'success' | 'error'
}

const props = defineProps<BaseAlert>()
const alertVariantClassNames = computed(() => {
    switch (props.variant) {
        case 'success':
            return 'bg-emerald-700/40 border-emerald-700'

        case 'error':
            return 'bg-red-700/40 border-red-700'

        default:
            return 'bg-gray-700/40 border-gray-700'
    }
})
</script>
