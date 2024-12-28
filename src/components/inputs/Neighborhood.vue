<script setup>
import { defineEmits } from 'vue';

const { modelValue } = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="col-span-10 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Neighborhood</label>
        <input :value="modelValue" @input="updateValue" type="text" placeholder="Type your neighborhood" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>