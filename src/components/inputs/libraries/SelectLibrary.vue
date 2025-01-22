<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    options: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: 'Select an option',
    },
});

const emit = defineEmits();
const selectedValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        selectedValue.value = newValue;
    }
);

const updateValue = () => {
    emit('update:modelValue', selectedValue.value);
};
</script>

<template>
    <div class="col-span-6 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">{{ label }}</label>
        <select v-model="selectedValue" @change="updateValue" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
            <option v-for="option in options" :key="option" :value="option" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600">
                {{ option.name }}
            </option>
        </select>
    </div>
</template>
