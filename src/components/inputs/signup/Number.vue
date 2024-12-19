<script setup>
import { ref, defineEmits } from 'vue';

const number = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', number.value);
};
</script>

<template>
    <div class="col-span-2 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Number</label>
        <input v-model="number" @input="updateValue" type="number" placeholder="Number" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>