<template>
    <KeepAlive>
        <Teleport to="body">
            <Transition name="fade">
                <div
                    class="fixed top-0 left-0 right-0 z-50 w-full sm:p-4 overflow-x-hidden overflow-y-auto sm:inset-0 h-full bg-black/60"
                    :class="
                        isModalVisible && 'flex justify-center sm:items-center'
                    "
                    v-if="isModalVisible"
                >
                    <div class="relative w-full max-w-2xl">
                        <div
                            class="relative bg-white sm:rounded-lg shadow dark:bg-[#262626] sm:border sm:border-emerald-500 h-[100vh] sm:h-full"
                            ref="modal"
                        >
                            <div
                                class="flex items-start justify-between p-6 border-b rounded-t dark:border-gray-600"
                            >
                                <slot name="header" />

                                <button
                                    type="button"
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    @click="$emit('close')"
                                >
                                    <svg
                                        aria-hidden="true"
                                        class="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- Modal body -->
                            <div class="p-6 space-y-6">
                                <slot name="body" />
                            </div>
                            <!-- Modal footer -->
                            <div
                                class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
                            >
                                <BaseButton
                                    @click="submitForm()"
                                    class="bg-emerald-700 transition-colors"
                                >
                                    Create post
                                </BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </KeepAlive>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface BaseFormModal {
    isModalVisible: boolean
}

const props = defineProps<BaseFormModal>()

const modal = ref<HTMLElement | null>(null)

const { isModalVisible } = toRefs(props)

const emits = defineEmits(['submit', 'close'])

onClickOutside(modal, () => emits('close'))
const submitForm = () => {
    emits('submit')
    emits('close')
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
    transition: all 0.3s ease-out;
}

.fade-leave-active {
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
