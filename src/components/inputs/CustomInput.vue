<script setup>
import { computed } from 'vue';

defineProps({
    inputType: {
        type: String,
        default: 'text'
    },
    inputPlaceholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    colSpan: {
        type: [String, Number],
        default: 1
    },
    labelText: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']); 

const inputValue = computed({
  get: () => modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<template>
    <div :class="`col-span-${colSpan} flex flex-col`">
        <label class="text-lg mb-1 text-left w-full">
            {{ labelText }}
        </label>
        <input
            :type="inputType"
            :placeholder="inputPlaceholder"
            v-model="inputValue"
            class="p-2 rounded-lg w-full text-gray-600"
        />
  </div>
</template>