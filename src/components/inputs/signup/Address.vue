<script setup>
import { ref, defineEmits } from 'vue';

const address = ref('');

const emit = defineEmits();

const updateValue = () => {
    emit('update:modelValue', address.value);
};
</script>

<template>
    <div class="col-span-8 flex flex-col">
        <label class="text-lg mb-1 text-left w-full">Address</label>
        <input v-model="address" @input="updateValue" type="text" placeholder="Type your address" class="p-2 rounded-lg w-full text-gray-600"/>
    </div>
</template>