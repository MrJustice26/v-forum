<template>
    <div
        class="relative inline-block"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
    >
        <slot></slot>
        <KeepAlive>
            <Transition name="fade">
                <div
                    v-if="state.visible"
                    class="absolute left-1/2 -translate-x-1/2 bg-gray-700 p-2 rounded-md text-sm whitespace-nowrap"
                    :class="defaultPropsClassNames"
                >
                    {{ content }}
                </div>
            </Transition>
        </KeepAlive>
    </div>
</template>

<script setup lang="ts">
interface BaseTooltip {
    content: string
    position?: 'top' | 'bottom'
}

const defaultProps = withDefaults(defineProps<BaseTooltip>(), {
    position: 'top',
})

const state = reactive({
    visible: false,
})

const showTooltip = () => {
    state.visible = true
}

const hideTooltip = () => {
    state.visible = false
}

const defaultPropsClassNames = computed(() => {
    switch (defaultProps.position) {
        case 'top':
            return 'bottom-[105%]'
        case 'bottom':
            return 'top-[105%]'
        default:
            return ''
    }
})
</script>

<style scoped lang="scss">
.fade-enter-active {
    transition: opacity 0.15s ease-out;
}

.fade-leave-active {
    transition: opacity 0.15s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
