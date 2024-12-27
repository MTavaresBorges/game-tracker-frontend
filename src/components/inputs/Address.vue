<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = () => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="col-span-8 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Address</label>
        <input @input="updateValue" type="text" placeholder="Type your address" class="bg-gray-200 p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>