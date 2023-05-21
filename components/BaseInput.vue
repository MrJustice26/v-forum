<template>
    <div>
        <label
            v-if="id && labelText"
            :for="id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ labelText }}</label
        >
        <input
            :id="id"
            :type="type || 'text'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target?.value)"
            class="border rounded-sm border-emerald-300/10 bg-gray-500/10 focus:bg-emerald-300/10 transition-colors hover:border-emerald-200 focus:border-emerald-200 text-white py-2 px-3 w-full mb-1 outline-none"
            :class="errorText ? errorInputClassNames : ''"
            :placeholder="placeholder"
        />
        <span
            v-if="!disableErrorText"
            class="mt-1 text-red-400 font-medium text-sm h-[1rem] inline-block w-full"
            >{{ errorText }}</span
        >
    </div>
</template>

<script setup lang="ts">
interface BaseInput {
    labelText?: string
    id?: string
    placeholder?: string
    type?: string
    modelValue?: string
    errorText?: string
    disableErrorText?: boolean
}

defineProps<BaseInput>()

const errorInputClassNames = `text-red-400 border-red-200 hover:border-red-200 focus:border-red-200 focus:bg-red-300/10`
</script>
